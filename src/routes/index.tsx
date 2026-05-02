import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Leaf, Sparkles, Heart, Flower2, Brain, ShieldCheck, Truck, BadgeIndianRupee,
  Check, ChevronDown, Star, Moon, Droplet,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroBogo from "@/assets/hero-bogo.png";
import product2 from "@/assets/product-2.jpg";
import product4 from "@/assets/product-4.jpg";
import benefitsImg from "@/assets/benefits.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Actiwow Nabhi Telam — Buy 1 Get 1 FREE | 100% Pure Ayurvedic Belly Button Oil" },
      { name: "description", content: "Authentic Ayurvedic Nabhi Telam (belly button oil) — improves digestion, glowing skin, hair growth, calm mind. Buy 1 Get 1 FREE at ₹449. Cash on Delivery, lowest RTO ₹49." },
      { property: "og:title", content: "Actiwow Nabhi Telam — Buy 1 Get 1 FREE" },
      { property: "og:description", content: "100% Pure & Organic Ayurvedic belly button oil. Double the wellness — Buy 1 Get 1 Free at ₹449." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <TrustStrip />
      <BenefitsSection />
      <WhyNavelSection />
      <HowToUseSection />
      <PurityBanner />
      <MarginCalculator />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--gold) 25%, transparent), transparent 50%), radial-gradient(circle at 80% 70%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 50%)" }} />
      <div className="relative mx-auto max-w-7xl px-5 py-14 md:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Leaf className="h-3.5 w-3.5" /> 100% Pure & Organic · Ayurvedic
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] text-foreground">
            Awaken Your <span className="text-saffron italic">Nabhi</span>.
            <br />
            <span className="text-primary">Heal From Within.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Shree Ram Kripa Nabhi Telam — a sacred Ayurvedic ritual in a bottle. Just 2–3 drops in your navel each night supports digestion, glowing skin, hair growth and a calmer mind.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="rounded-2xl bg-card border border-border px-5 py-3 shadow-soft">
              <div className="flex items-baseline gap-2">
                <span className="text-sm line-through text-muted-foreground">₹898</span>
                <span className="font-display text-3xl font-bold text-foreground">₹449</span>
              </div>
              <p className="text-xs font-medium text-saffron">for 2 bottles · 60ml total</p>
            </div>
            <div className="rounded-2xl bg-gradient-gold px-6 py-4 shadow-gold">
              <p className="text-[10px] font-bold tracking-[0.2em] text-gold-foreground/80">SPECIAL OFFER</p>
              <p className="font-display text-xl font-extrabold text-gold-foreground">BUY 1 GET 1 FREE</p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/checkout"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-elegant hover:opacity-95 transition"
            >
              Order Now — ₹449 <Sparkles className="h-4 w-4" />
            </Link>
            <a
              href="#calculator"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-7 py-3.5 text-base font-semibold text-primary hover:bg-primary/5 transition"
            >
              Reseller? Set Margin →
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Cash on Delivery</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Lowest RTO ₹49</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Pan India Shipping</li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
          <img
            src={heroBogo}
            alt="Actiwow Nabhi Telam Buy 1 Get 1 Free — 2 bottles of Ayurvedic belly button oil"
            className="relative w-full rounded-3xl shadow-elegant border border-gold/30"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: Leaf, label: "100% Pure & Organic" },
    { icon: ShieldCheck, label: "No Chemicals" },
    { icon: Truck, label: "Pan India Shipping" },
    { icon: BadgeIndianRupee, label: "Cash on Delivery" },
  ];
  return (
    <div className="border-y border-border/60 bg-card/50">
      <div className="mx-auto max-w-7xl px-5 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 justify-center md:justify-start">
            <Icon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BenefitsSection() {
  const benefits = [
    { icon: Sparkles, title: "Improves Digestion", desc: "Supports gut health and reduces bloating, naturally." },
    { icon: Flower2, title: "Glowing Healthy Skin", desc: "Hydrates from within — fades dryness and dullness." },
    { icon: Leaf, title: "Promotes Hair Growth", desc: "Nourishes roots indirectly for healthier, stronger hair." },
    { icon: Brain, title: "Calms Mind & Body", desc: "A relaxing nightly ritual that melts away stress." },
    { icon: Heart, title: "Reproductive Health", desc: "Traditionally used to balance internal body functions." },
    { icon: Moon, title: "Better Sleep", desc: "Wind down with an ancient ritual that grounds you." },
  ];
  return (
    <section id="benefits" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-2xl">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-saffron">Key Benefits</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-foreground">
            One drop. Infinite wellness.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Your navel connects to thousands of nerves. Oil applied here is absorbed deep — supporting the body inside and out.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elegant transition hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-soft">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyNavelSection() {
  return (
    <section className="py-16 md:py-24 bg-card/40 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
        <img src={product2} alt="Nabhi Talam belly button oil with herbal leaf" className="rounded-3xl shadow-elegant" loading="lazy" />
        <div>
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-saffron">Ancient Wisdom</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-foreground">
            Why apply oil in the <span className="italic text-primary">navel</span>?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            In Ayurveda, the nabhi (navel) is the seat of vital energy — connected to over 70,000 nerves. Applying warm oil here allows deep absorption, balancing your body's natural rhythms while you sleep.
          </p>
          <ul className="mt-6 space-y-3">
            {["Deep absorption through the navel point", "Balances doshas — Vata, Pitta, Kapha", "Cold-pressed Sidhdha oils & natural herbs", "Backed by 5,000 years of Ayurvedic tradition"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </span>
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HowToUseSection() {
  const steps = [
    { n: "01", icon: Droplet, title: "Lie down before sleep", desc: "Get comfortable. Make it your nightly ritual." },
    { n: "02", icon: Leaf, title: "Apply 2–3 drops", desc: "Place drops directly into your belly button." },
    { n: "03", icon: Sparkles, title: "Gently massage", desc: "Massage softly around the navel in circles." },
    { n: "04", icon: Moon, title: "Leave overnight", desc: "Let it work while you sleep. Wake up renewed." },
  ];
  return (
    <section id="how" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-saffron">How To Use</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-foreground">
            A 30-second ritual. Lifelong benefits.
          </h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ n, icon: Icon, title, desc }) => (
            <div key={n} className="relative rounded-2xl bg-gradient-hero border border-border p-6 shadow-soft">
              <span className="absolute -top-3 -left-3 h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center font-display text-lg font-bold text-gold-foreground shadow-gold">
                {n}
              </span>
              <Icon className="h-6 w-6 text-primary mt-2" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PurityBanner() {
  return (
    <section className="py-16 md:py-20 bg-gradient-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-gold">100% Natural & Safe</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            No chemicals. No shortcuts. <br /> Just <span className="text-gold italic">pure tradition.</span>
          </h2>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {["100% Natural & Safe","No Side Effects","No Chemicals","No Artificial Fragrance","Cold-Pressed Oils","Ayurvedic Herbs"].map((t) => (
              <li key={t} className="flex items-center gap-2.5">
                <Check className="h-5 w-5 text-gold" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <img src={benefitsImg} alt="Nabhi oil benefits with belly button before-after results" className="rounded-3xl shadow-elegant border border-gold/30" loading="lazy" />
      </div>
    </section>
  );
}

function MarginCalculator() {
  const COST = 449;
  const RTO = 49;
  const MIN = COST + 1; // 450
  const MAX = 5000;
  const [price, setPrice] = useState(799);
  const [priceText, setPriceText] = useState("799");

  const profit = useMemo(() => Math.max(0, price - COST), [price]);
  const profitWithRefund = useMemo(() => profit + RTO, [profit]);

  const onSlider = (v: number) => {
    setPrice(v);
    setPriceText(String(v));
  };

  const onTypePrice = (raw: string) => {
    // allow free typing — strip non-digits, keep empty allowed while typing
    const digits = raw.replace(/[^\d]/g, "").slice(0, 5);
    setPriceText(digits);
    if (digits === "") return;
    const n = Number(digits);
    if (!Number.isNaN(n)) setPrice(n);
  };

  const commitPrice = () => {
    let n = Number(priceText);
    if (!Number.isFinite(n) || n < MIN) n = MIN;
    if (n > MAX) n = MAX;
    setPrice(n);
    setPriceText(String(n));
  };

  return (
    <section id="calculator" className="py-20 md:py-28 bg-card/40 border-y border-border/60">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-saffron">For Resellers & Dropshippers</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-foreground">
            Set Your Own Margin
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            We charge ₹449 per order + just ₹49 RTO — one of the lowest in India. You decide the final selling price and pocket the rest.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          {/* Calculator */}
          <div className="rounded-3xl border border-border bg-card p-7 md:p-8 shadow-soft">
            <h3 className="font-display text-2xl font-semibold text-foreground">Your Selling Price</h3>
            <p className="text-sm text-muted-foreground mt-1">Final price your customer pays</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-6xl font-bold text-primary">₹{price}</span>
            </div>

            <input
              type="range"
              min={MIN}
              max={1500}
              value={price}
              onChange={(e) => onSlider(Number(e.target.value))}
              className="mt-5 w-full accent-[var(--saffron)]"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>₹{MIN}</span>
              <span>₹1500</span>
            </div>

            <label className="mt-6 block">
              <span className="text-sm font-medium text-foreground">Or type exact amount (e.g. 799)</span>
              <div className="mt-2 flex items-center rounded-xl border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                <span className="px-4 text-muted-foreground">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={priceText}
                  onChange={(e) => onTypePrice(e.target.value)}
                  onBlur={commitPrice}
                  onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                  placeholder={String(MIN)}
                  className="w-full py-3 pr-4 bg-transparent outline-none text-lg font-semibold"
                />
              </div>
              <span className="mt-2 block text-xs text-muted-foreground">Min ₹{MIN} · Max ₹{MAX}</span>
            </label>

            <Link
              to="/checkout"
              search={{ price }}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-7 py-4 text-base font-bold text-gold-foreground shadow-gold hover:opacity-95 transition"
            >
              Place an Order at ₹{price} →
            </Link>

            <div className="mt-6 space-y-2 text-sm">
              <Row label="Product cost" value={`₹${COST}`} />
              <Row label="RTO charge (lowest possible)" value={`₹${RTO}`} />
              <Row label="Includes Buy 1 Get 1 Free" value="2 bottles" />
            </div>
          </div>

          {/* Earnings */}
          <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-7 md:p-8 shadow-elegant">
            <h3 className="font-display text-2xl font-semibold">Your Earnings</h3>

            <div className="mt-6 rounded-2xl bg-primary-foreground/10 backdrop-blur p-6 border border-primary-foreground/15">
              <p className="flex items-center gap-2 text-sm font-semibold text-gold">
                <Check className="h-4 w-4" /> If order is delivered
              </p>
              <p className="mt-2 font-display text-5xl font-bold text-gold">₹{profit}</p>
              <p className="text-sm opacity-80">profit per order in your pocket</p>
            </div>

            <div className="mt-4 rounded-2xl bg-primary-foreground/5 p-6 border border-primary-foreground/10">
              <p className="text-sm font-semibold opacity-90">If order returns (RTO)</p>
              <p className="mt-2 font-display text-3xl font-bold">Only −₹{RTO} loss</p>
              <p className="text-sm opacity-80 mt-2">
                And if the customer doesn't return it later, the ₹{RTO} RTO is refunded — your earning becomes <span className="font-bold text-gold">₹{profitWithRefund}</span>.
              </p>
            </div>

            <p className="mt-5 text-xs opacity-70 leading-relaxed">
              * RTO refund is processed when the parcel is undelivered & not returned to the customer within the eligible window. One of the lowest RTO charges in the industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-border pb-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}

function Testimonials() {
  const items = [
    { name: "Priya S.", text: "Within 2 weeks my bloating reduced and skin started glowing. The ritual is so calming!", rating: 5 },
    { name: "Rahul M.", text: "Father-in-law swears by Nabhi oil. Authentic Ayurveda — and BOGO is a steal.", rating: 5 },
    { name: "Anita K.", text: "I sleep deeper, wake fresher. Hair fall is also visibly reducing.", rating: 5 },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-saffron">Loved Across India</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-foreground">10,000+ happy nights</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {items.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-foreground leading-relaxed">"{t.text}"</p>
              <p className="mt-4 font-semibold text-sm text-muted-foreground">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "What's included in the Buy 1 Get 1 Free offer?", a: "You get 2 full 30ml bottles of Actiwow Nabhi Telam for just ₹449 — that's twice the wellness at the same price." },
  { q: "How long does delivery take?", a: "Orders are usually delivered within 4–7 business days across India. Cash on Delivery is available everywhere." },
  { q: "What is the RTO charge for resellers?", a: "Just ₹49 per RTO — one of the lowest in the industry. If the parcel is later not returned to the customer within the eligible window, the RTO charge is refunded back to you." },
  { q: "Is the oil safe for daily use?", a: "Yes. It's 100% pure & organic — no chemicals, no artificial fragrance. Made with cold-pressed Ayurvedic oils and herbs, safe for daily external use." },
  { q: "When will I see results?", a: "Most users feel calmer sleep and lighter digestion within the first week. Visible skin & hair benefits build over 4–6 weeks of daily use." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-28 bg-card/40 border-y border-border/60">
      <div className="mx-auto max-w-3xl px-5">
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-saffron text-center">FAQ</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold text-foreground text-center">Frequently Asked</h2>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <button
              key={f.q}
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-primary/30 transition"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-foreground">{f.q}</span>
                <ChevronDown className={`h-5 w-5 text-primary transition ${open === i ? "rotate-180" : ""}`} />
              </div>
              {open === i && <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 md:p-16 text-center text-primary-foreground shadow-elegant">
          <div className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 30% 20%, var(--gold), transparent 50%), radial-gradient(circle at 70% 80%, var(--saffron), transparent 50%)" }} />
          <div className="relative">
            <img src={product4} alt="Two bottles of Nabhi Talam Ayurvedic oil with happy customer" className="mx-auto h-44 md:h-56 w-auto rounded-2xl shadow-gold mb-6" loading="lazy" />
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-gold">Limited Stock</p>
            <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold">
              Begin your nightly <span className="text-gold italic">ritual</span> tonight.
            </h2>
            <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">
              Buy 1 Get 1 Free at just ₹449. Cash on Delivery. Pan India shipping.
            </p>
            <Link
              to="/checkout"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-9 py-4 text-base font-bold text-gold-foreground shadow-gold hover:opacity-95 transition"
            >
              Order Now — ₹449 <Sparkles className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
