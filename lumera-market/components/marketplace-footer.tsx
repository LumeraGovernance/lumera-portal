import Link from "next/link"

export function MarketplaceFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">About Lumera Market</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A cooperative marketplace owned by all citizens. Every transaction strengthens our collective fund and
              supports ethical producers.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=fresh"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fresh Produce
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=dry-goods"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dry Goods
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=craft"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Craft & Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=household"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Household
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/producers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Producers
                </Link>
              </li>
              <li>
                <Link href="/governance" className="text-muted-foreground hover:text-foreground transition-colors">
                  Governance
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="text-muted-foreground hover:text-foreground transition-colors">
                  Transparency Reports
                </Link>
              </li>
              <li>
                <Link href="/citizenship" className="text-muted-foreground hover:text-foreground transition-colors">
                  Become a Citizen
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-muted-foreground hover:text-foreground transition-colors">
                  Delivery Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2025 Lumera Market. Collectively owned, ethically operated.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/ethics" className="text-muted-foreground hover:text-foreground transition-colors">
              Ethics Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
