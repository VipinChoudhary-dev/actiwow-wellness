import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center shadow-soft">
            <Leaf className="h-4 w-4 text-primary-foreground" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Acti<span className="text-saffron">wow</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          <a href="/#benefits" className="hover:text-foreground transition">Benefits</a>
          <a href="/#how" className="hover:text-foreground transition">How to use</a>
          <a href="/#calculator" className="hover:text-foreground transition">Reseller Margin</a>
          <a href="/#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <Link
          to="/checkout"
          className="inline-flex items-center rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold hover:opacity-95 transition"
        >
          Order Now
        </Link>
      </div>
    </header>
  );
}
