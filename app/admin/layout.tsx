'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut 
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-primary-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-primary-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-primary-200">
          <span className="font-serif text-2xl font-bold text-primary-900 tracking-tight">Admin<span className="text-accent">.</span></span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-900 text-white' 
                    : 'text-primary-600 hover:bg-primary-100 hover:text-primary-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-primary-200">
          <button className="flex items-center space-x-3 text-primary-600 hover:text-accent transition-colors px-3 py-2 w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (minimal) */}
        <header className="md:hidden h-16 bg-white border-b border-primary-200 flex items-center px-4 justify-between">
          <span className="font-serif text-xl font-bold text-primary-900">Admin<span className="text-accent">.</span></span>
          {/* Add a simple hamburger menu here if needed later */}
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
