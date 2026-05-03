import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-50 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-bold text-2xl tracking-tighter">
              Nutracore<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 text-primary-200 max-w-md">
              Premium quality dry fruits and nuts delivered directly to your doorstep. Sourced from the best farms worldwide for your daily nutrition.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-primary-200 hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/about" className="text-primary-200 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-primary-200 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-primary-200 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-primary-200 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-primary-200 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/shipping" className="text-primary-200 hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-primary-200 hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-800 text-center text-primary-300">
          <p>&copy; {new Date().getFullYear()} Nutracore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
