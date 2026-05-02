export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40 mt-20">
      <div className="mx-auto max-w-7xl px-5 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-display text-base text-foreground">
          Acti<span className="text-saffron">wow</span> — The Art of Refined Beauty
        </p>
        <p>© {new Date().getFullYear()} Actiwow Ayurveda. 100% Pure & Organic.</p>
        <p className="flex items-center gap-3">
          <span>Cash on Delivery</span>·<span>Pan India Shipping</span>·<span>Lowest RTO ₹49</span>
        </p>
      </div>
    </footer>
  );
}
