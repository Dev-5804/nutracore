'use client'

import Link from 'next/link'
import { ShoppingBag, User, Menu, LogOut, X } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { logout } from '@/lib/actions/auth'

export default function Navbar({ user }: { user: any }) {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const cartItems = useCartStore((state) => state.items)
  const pathname = usePathname()
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const isHome = pathname === '/'

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Shop All', href: '/products' },
    { label: 'Almonds', href: '/products?category=Almonds' },
    { label: 'Cashews', href: '/products?category=Cashews' },
    { label: 'Walnuts', href: '/products?category=Walnuts' }
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'glass py-3' : isHome ? 'bg-transparent py-6' : 'bg-background py-4 border-b border-primary-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className={`p-2 transition-colors ${scrolled || !isHome ? 'text-white' : 'text-white'}`}
            >
              {menuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link href="/" className={`font-serif text-3xl italic tracking-wide transition-colors ${
              scrolled || !isHome ? 'text-white' : 'text-white'
            }`}>
              Nutracore<span className="text-accent text-4xl not-italic leading-none">.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className={`text-sm tracking-widest uppercase transition-colors hover:text-accent ${
                  scrolled || !isHome ? 'text-white' : 'text-white/90'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-6">
                <Link href="/admin" className="hidden sm:block text-sm font-medium tracking-widest uppercase transition-colors hover:text-accent text-white">
                  Admin
                </Link>
                <form action={logout} className="flex">
                  <button type="submit" className={`hidden sm:block transition-colors hover:text-accent ${
                    scrolled || !isHome ? 'text-white' : 'text-white'
                  }`} title="Log out">
                    <LogOut className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/login" className={`hidden sm:block transition-colors hover:text-accent ${
                scrolled || !isHome ? 'text-white' : 'text-white'
              }`} title="Log in">
                <User className="h-5 w-5" strokeWidth={1.5} />
              </Link>
            )}
            <Link href="/cart" className={`relative transition-colors hover:text-accent ${
              scrolled || !isHome ? 'text-white' : 'text-white'
            }`}>
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile menu panel */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-primary-950/95 border-t border-primary-900">
          <div className="px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm tracking-widest uppercase text-white/90 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-primary-800 flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-widest text-white/90 hover:text-accent">
                    Admin
                  </Link>
                  <form action={logout} className="flex">
                    <button type="submit" className="text-sm uppercase tracking-widest text-white/90 hover:text-accent">
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-widest text-white/90 hover:text-accent">
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
