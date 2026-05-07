import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import {
  Check, Leaf, ShieldCheck, Truck, ArrowLeft, X,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroBogo from "@/assets/hero-bogo.png";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const COST = 399;
const RTO_ADVANCE = 49;
const MIN_PRICE = 400;
const MAX_PRICE = 5000;

const searchSchema = z.object({
  price: z.coerce.number().int().min(MIN_PRICE).max(MAX_PRICE).optional(),
});

export const Route = createFileRoute("/checkout")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Secure Checkout — Actiwow Nabhi Telam Buy 1 Get 1 FREE" },
      { name: "description", content: "Fill customer & dropshipper details. Pay only ₹49 advance RTO. Pan India shipping, lowest RTO in the industry." },
    ],
  }),
  component: CheckoutPage,
});

type CustomerForm = {
  cName: string; cPhone: string; cAddress: string;
  cCity: string; cState: string; cPincode: string;
};
type DropshipperForm = {
  dName: string; dPhone: string; dUpi: string;
};

const customerSchema = z.object({
  cName: z.string().trim().min(2, "Enter customer's full name").max(80),
  cPhone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  cAddress: z.string().trim().min(8, "Enter the full delivery address").max(250),
  cCity: z.string().trim().min(2, "Enter the city").max(60),
  cState: z.string().trim().min(2, "Enter the state").max(60),
  cPincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

const dropshipperSchema = z.object({
  dName: z.string().trim().min(2, "Enter your full name").max(80),
  dPhone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  dUpi: z.string().trim().max(80).optional().or(z.literal("")),
});

function CheckoutPage() {
  const { price: priceParam } = Route.useSearch();
  const orderTotal = priceParam ?? 699; // what the customer pays on COD

  const subtotal = orderTotal * 2;       // BOGO display: 2 × price
  const bogoDiscount = orderTotal;       // discount = one of them is free

  const [customer, setCustomer] = useState<CustomerForm>({
    cName: "", cPhone: "", cAddress: "", cCity: "", cState: "", cPincode: "",
  });
  const [dropshipper, setDropshipper] = useState<DropshipperForm>({
    dName: "", dPhone: "", dUpi: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPay, setShowPay] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateCustomer = (k: keyof CustomerForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };
  const updateDropshipper = (k: keyof DropshipperForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropshipper((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  const onContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    const cRes = customerSchema.safeParse(customer);
    if (!cRes.success) {
      for (const i of cRes.error.issues) {
        const k = i.path[0] as string;
        if (!errs[k]) errs[k] = i.message;
      }
    }
    const dRes = dropshipperSchema.safeParse(dropshipper);
    if (!dRes.success) {
      for (const i of dRes.error.issues) {
        const k = i.path[0] as string;
        if (!errs[k]) errs[k] = i.message;
      }
    }
    if (Object.keys(errs).length) {
      setErrors(errs);
      // scroll to first error
      const first = document.querySelector(`[data-field-error="true"]`);
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setShowPay(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <CheckoutContent
          orderTotal={orderTotal}
          subtotal={subtotal}
          bogoDiscount={bogoDiscount}
          customer={customer}
          dropshipper={dropshipper}
          errors={errors}
          updateCustomer={updateCustomer}
          updateDropshipper={updateDropshipper}
          onContinue={onContinue}
          dimmed
        />
        <ThankYouModal name={customer.cName} pincode={customer.cPincode} onClose={() => (window.location.href = "/")} />
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <CheckoutContent
        orderTotal={orderTotal}
        subtotal={subtotal}
        bogoDiscount={bogoDiscount}
        customer={customer}
        dropshipper={dropshipper}
        errors={errors}
        updateCustomer={updateCustomer}
        updateDropshipper={updateDropshipper}
        onContinue={onContinue}
      />
      {showPay && (
        <PayAdvanceModal
          orderTotal={orderTotal}
          onClose={() => setShowPay(false)}
          onPlace={async () => {
            try {
              const { error } = await supabase.from("orders").insert([{
                customer_name: customer.cName,
                customer_phone: customer.cPhone,
                customer_address: customer.cAddress,
                customer_city: customer.cCity,
                customer_state: customer.cState,
                customer_pincode: customer.cPincode,
                dropshipper_name: dropshipper.dName,
                dropshipper_phone: dropshipper.dPhone,
                dropshipper_upi: dropshipper.dUpi,
                total_amount: orderTotal
              }]);
              if (error) {
                console.error("Supabase insert error:", error);
                toast.error(`Database Error: ${error.message || "Failed to save"}`);
                return;
              }
            } catch (err) {
              console.error(err);
              toast.error("Network error.");
              return;
            }
            setShowPay(false); 
            setSubmitted(true); 
            window.scrollTo({ top: 0, behavior: "smooth" }); 
          }}
        />
      )}
      <SiteFooter />
    </div>
  );
}

function CheckoutContent({
  orderTotal, subtotal, bogoDiscount,
  customer, dropshipper, errors,
  updateCustomer, updateDropshipper, onContinue, dimmed,
}: {
  orderTotal: number; subtotal: number; bogoDiscount: number;
  customer: CustomerForm; dropshipper: DropshipperForm;
  errors: Record<string, string>;
  updateCustomer: (k: keyof CustomerForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  updateDropshipper: (k: keyof DropshipperForm) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContinue: (e: React.FormEvent) => void;
  dimmed?: boolean;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-5 py-10 md:py-14 ${dimmed ? "opacity-40 pointer-events-none" : ""}`}>
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
        <ArrowLeft className="h-4 w-4" /> Back to product
      </Link>

      <div className="text-center mt-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
          Secure <span className="italic text-gold">Checkout</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Fill customer &amp; dropshipper details. Pay only ₹{RTO_ADVANCE} advance RTO.
        </p>
      </div>

      <form onSubmit={onContinue} className="mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-8">
        <div className="space-y-6">
          {/* Customer Details */}
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-soft">
            <SectionHeader number={1} title="Customer Details" subtitle="The real person who'll receive the parcel" />
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              <Field label="Customer Full Name" required error={errors.cName} className="md:col-span-2">
                <input className={inputCls(!!errors.cName)} value={customer.cName} onChange={updateCustomer("cName")} placeholder="Customer's full name" maxLength={80} />
              </Field>
              <Field label="Customer Phone Number" required error={errors.cPhone} className="md:col-span-2">
                <input className={inputCls(!!errors.cPhone)} value={customer.cPhone} onChange={updateCustomer("cPhone")} placeholder="10-digit mobile number" inputMode="numeric" maxLength={10} />
              </Field>
              <Field label="Full Delivery Address" required error={errors.cAddress} className="md:col-span-2">
                <textarea rows={3} className={inputCls(!!errors.cAddress) + " resize-none"} value={customer.cAddress} onChange={updateCustomer("cAddress")} placeholder="House no, street, area, landmark" maxLength={250} />
              </Field>
              <Field label="City" required error={errors.cCity}>
                <input className={inputCls(!!errors.cCity)} value={customer.cCity} onChange={updateCustomer("cCity")} placeholder="Mumbai" maxLength={60} />
              </Field>
              <Field label="State" required error={errors.cState}>
                <input className={inputCls(!!errors.cState)} value={customer.cState} onChange={updateCustomer("cState")} placeholder="Maharashtra" maxLength={60} />
              </Field>
              <Field label="Pincode" required error={errors.cPincode}>
                <input className={inputCls(!!errors.cPincode)} value={customer.cPincode} onChange={updateCustomer("cPincode")} placeholder="400001" inputMode="numeric" maxLength={6} />
              </Field>
            </div>
          </div>

          {/* Dropshipper Details */}
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-soft">
            <SectionHeader number={2} title="Your Details (Dropshipper)" subtitle="For order updates & RTO refund" />
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              <Field label="Your Full Name" required error={errors.dName} className="md:col-span-2">
                <input className={inputCls(!!errors.dName)} value={dropshipper.dName} onChange={updateDropshipper("dName")} placeholder="Your full name" maxLength={80} />
              </Field>
              <Field label="Your Phone Number" required error={errors.dPhone}>
                <input className={inputCls(!!errors.dPhone)} value={dropshipper.dPhone} onChange={updateDropshipper("dPhone")} placeholder="10-digit mobile number" inputMode="numeric" maxLength={10} />
              </Field>
              <Field label="Your UPI ID (Optional)" error={errors.dUpi}>
                <input className={inputCls(!!errors.dUpi)} value={dropshipper.dUpi} onChange={updateDropshipper("dUpi")} placeholder="yourname@upi (for refunds)" maxLength={80} />
              </Field>
            </div>
          </div>

          <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-elegant hover:opacity-95 transition">
            Continue →
          </button>
          <p className="text-center text-xs text-muted-foreground">
            For further communication regarding your order, contact us at{" "}
            <a href="mailto:sanctuarystriker@gmail.com" className="underline font-medium">sanctuarystriker@gmail.com</a>
          </p>
        </div>

        {/* Sidebar / Order summary */}
        <aside className="rounded-3xl border border-border bg-card p-6 md:p-7 shadow-soft h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-semibold text-foreground">Your Order</h2>
          <div className="mt-5 flex gap-4 items-center">
            <img src={heroBogo} alt="Actiwow Nabhi Telam Buy 1 Get 1 Free" className="h-24 w-24 rounded-xl object-cover border border-gold/30" />
            <div className="flex-1">
              <p className="font-semibold text-foreground">Actiwow Nabhi Telam</p>
              <p className="text-xs font-bold text-saffron mt-0.5">BUY 1 GET 1 FREE</p>
              <p className="text-xs text-muted-foreground mt-0.5">2 boxes × 30ml</p>
            </div>
          </div>

          <ul className="mt-6 space-y-2 text-sm">
            <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
            <SummaryRow label="BOGO Discount" value={`−₹${bogoDiscount}`} accent />
            <SummaryRow label="Shipping" value="FREE" highlight />
          </ul>

          <div className="mt-5 pt-4 border-t border-dashed border-border flex items-baseline justify-between">
            <span className="font-display text-lg font-semibold text-foreground">Order Total</span>
            <span className="font-display text-3xl font-bold text-primary">₹{orderTotal}</span>
          </div>

          <div className="mt-5 rounded-2xl bg-gradient-gold/10 border border-gold/30 p-4 bg-gold/5">
            <p className="text-xs font-bold uppercase tracking-wider text-saffron">Pay Now (Advance RTO)</p>
            <p className="font-display text-2xl font-extrabold text-saffron mt-1">₹{RTO_ADVANCE} only</p>
            <p className="mt-1 text-xs text-muted-foreground">Customer pays ₹{orderTotal} on delivery (COD)</p>
          </div>

          <div className="mt-5 rounded-2xl bg-muted/40 border border-border p-4">
            <p className="font-semibold text-foreground text-sm">Why ₹{RTO_ADVANCE} Advance?</p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              To ensure smooth delivery and minimize order returns (RTO), our team personally contacts each customer to verify their details before dispatch.
            </p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              This extra verification step helps us maintain one of the lowest RTO rates in the market — higher delivery success and better profitability for you.
            </p>
          </div>

          <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><Leaf className="h-3.5 w-3.5 text-primary" /> 100% Pure Ayurvedic & Safe</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Lowest RTO ₹{RTO_ADVANCE} (Resellers)</li>
            <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-primary" /> Pan India Shipping</li>
          </ul>
        </aside>
      </form>
    </section>
  );
}

function SectionHeader({ number, title, subtitle }: { number: number; title: string; subtitle: string }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center font-display text-base font-bold text-gold-foreground shadow-gold">
          {number}
        </span>
        <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground ml-12">{subtitle}</p>
    </div>
  );
}

function inputCls(error: boolean) {
  return `w-full rounded-xl border bg-background px-4 py-3 text-foreground outline-none transition focus:ring-2 focus:ring-ring ${
    error ? "border-destructive" : "border-input"
  }`;
}

function Field({ label, required, error, children, className = "" }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <label className={`block ${className}`} data-field-error={!!error}>
      <span className="text-sm font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function SummaryRow({ label, value, strike, highlight, accent }: { label: string; value: string; strike?: boolean; highlight?: boolean; accent?: boolean }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${strike ? "line-through text-muted-foreground" : highlight ? "text-primary font-semibold" : accent ? "text-saffron font-semibold" : "text-foreground"}`}>
        {value}
      </span>
    </li>
  );
}

/* ---------------- Modals ---------------- */

function ModalShell({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-foreground/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-card border border-border shadow-elegant p-7 md:p-8 animate-in zoom-in-95 duration-200">
        {onClose && (
          <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted transition" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

function PayAdvanceModal({ orderTotal, onClose, onPlace }: { orderTotal: number; onClose: () => void; onPlace: () => void | Promise<void> }) {
  // simple inline SVG QR-style placeholder (decorative)
  return (
    <ModalShell onClose={onClose}>
      <p className="text-center text-sm text-muted-foreground">Please verify customer and dropshipper details before payment</p>
      <h3 className="mt-2 text-center font-display text-2xl font-bold text-foreground">
        Pay ₹{RTO_ADVANCE} Advance RTO
      </h3>
      <p className="mt-1 text-center text-xs text-muted-foreground">Scan the QR with any UPI app</p>

      <div className="mt-5 mx-auto w-fit rounded-2xl bg-gradient-primary p-5 shadow-elegant border border-gold/30">
        <FakeQR />
      </div>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Customer pays <span className="font-semibold text-foreground">₹{orderTotal}</span> on delivery. You only pay <span className="font-semibold text-saffron">₹{RTO_ADVANCE}</span> RTO advance now.
      </p>

      <button onClick={onPlace} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-elegant hover:opacity-95 transition">
        Place Order
      </button>
      <button onClick={onClose} className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground transition">
        ← Back to details
      </button>
    </ModalShell>
  );
}

function FakeQR() {
  // Decorative QR pattern. Not a real payment code.
  const cells = 21;
  const seed = (i: number, j: number) => ((i * 73 + j * 91 + i * j * 13) % 7) > 3;
  return (
    <div className="grid bg-primary-foreground p-2 rounded-md" style={{ gridTemplateColumns: `repeat(${cells}, 1fr)`, width: 196, height: 196 }}>
      {Array.from({ length: cells * cells }).map((_, idx) => {
        const i = Math.floor(idx / cells), j = idx % cells;
        const corner =
          (i < 7 && j < 7) || (i < 7 && j >= cells - 7) || (i >= cells - 7 && j < 7);
        const inCornerRing =
          corner &&
          ((i === 0 || j === 0 || i === 6 || j === 6 || i === cells - 1 || j === cells - 1 || i === cells - 7 || j === cells - 7) ||
            ((i >= 2 && i <= 4) && (j >= 2 && j <= 4)) ||
            ((i >= 2 && i <= 4) && (j >= cells - 5 && j <= cells - 3)) ||
            ((i >= cells - 5 && i <= cells - 3) && (j >= 2 && j <= 4)));
        const filled = corner ? inCornerRing : seed(i, j);
        return <div key={idx} style={{ background: filled ? "var(--primary)" : "transparent" }} />;
      })}
    </div>
  );
}

function ThankYouModal({ name, pincode, onClose }: { name: string; pincode: string; onClose: () => void }) {
  return (
    <ModalShell>
      <div className="mx-auto h-14 w-14 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant">
        <Leaf className="h-7 w-7 text-gold" />
      </div>
      <h3 className="mt-5 text-center font-display text-3xl font-bold text-foreground">
        Thank You for <span className="italic text-gold">Shopping</span> with Us!
      </h3>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Your order for <span className="font-semibold text-foreground">{name || "your customer"}</span> has been placed. We'll dispatch shortly to <span className="font-semibold text-foreground">{pincode || "the pincode"}</span>.
      </p>
      <div className="mt-5 rounded-2xl bg-muted/40 border border-border p-3 text-center text-xs text-muted-foreground">
        For further communication regarding your order, contact at email{" "}
        <a href="mailto:sanctuarystriker@gmail.com" className="underline font-medium">sanctuarystriker@gmail.com</a>
      </div>
      <button onClick={onClose} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-4 text-base font-bold text-primary-foreground shadow-elegant hover:opacity-95 transition">
        Back to Home
      </button>
    </ModalShell>
  );
}

function _SummaryUnused() {
  // keep lucide Check imported tree clean
  return <Check className="hidden" />;
}
