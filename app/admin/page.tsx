import Link from 'next/link'
import { Package, ShoppingCart, IndianRupee, TrendingUp } from 'lucide-react'
import { getProducts } from '@/lib/actions/products'
import { getOrders } from '@/lib/actions/orders'

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800'
    case 'Processing': return 'bg-blue-100 text-blue-800'
    case 'Shipped': return 'bg-indigo-100 text-indigo-800'
    case 'Delivered': return 'bg-green-100 text-green-800'
    case 'Cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default async function AdminDashboard() {
  const products = await getProducts()
  const orders = await getOrders()
  
  const totalProducts = products.length
  const lowStockProducts = products.filter(p => p.stock_quantity < 10).length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order: any) => sum + Number(order.total_amount || 0), 0)
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-primary-900 mb-2">Dashboard</h1>
        <p className="text-primary-600">Overview of your store&apos;s performance</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-primary-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-primary-500 uppercase tracking-wider">Total Revenue</p>
            <p className="text-2xl font-bold text-primary-900">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-primary-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-primary-500 uppercase tracking-wider">Total Orders</p>
            <p className="text-2xl font-bold text-primary-900">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-primary-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-accent/10 text-accent rounded-lg">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-primary-500 uppercase tracking-wider">Active Products</p>
            <p className="text-2xl font-bold text-primary-900">{totalProducts}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-primary-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-primary-500 uppercase tracking-wider">Low Stock</p>
            <p className="text-2xl font-bold text-primary-900">{lowStockProducts}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders Snippet */}
      <div className="bg-white rounded-xl border border-primary-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-primary-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-primary-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-primary-700 hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-50/50 text-primary-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100">
              {recentOrders.length === 0 && (
                <tr>
                  <td className="px-6 py-6 text-sm text-primary-500" colSpan={5}>No orders yet.</td>
                </tr>
              )}
              {recentOrders.map((order: any) => (
                <tr key={order.id} className="hover:bg-primary-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-primary-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-primary-600">{order.address?.full_name || order.guest_email}</td>
                  <td className="px-6 py-4 text-sm text-primary-600">
                    {order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusBadge(order.status)}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-primary-900 text-right">
                    ₹{Number(order.total_amount || 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
