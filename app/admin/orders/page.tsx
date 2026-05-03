import { Search, Filter } from 'lucide-react'
import { getOrders } from '@/lib/actions/orders'
import AdminOrderActions from '@/components/AdminOrderActions'

export const dynamic = 'force-dynamic'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800'
    case 'Processing': return 'bg-blue-100 text-blue-800'
    case 'Shipped': return 'bg-indigo-100 text-indigo-800'
    case 'Delivered': return 'bg-green-100 text-green-800'
    case 'Cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default async function AdminOrdersPage() {
  const orders = await getOrders()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-primary-900 mb-2">Orders</h1>
        <p className="text-primary-600">Track and manage customer orders.</p>
      </div>

      <div className="bg-white rounded-xl border border-primary-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-primary-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-primary-50/30">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
            <input 
              type="text" 
              placeholder="Search order ID or customer..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-primary-700 bg-white border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter Status
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-50/50 text-primary-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Order Details</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
              <tbody className="divide-y divide-primary-100">
              {(orders || []).map((order: any) => (
                <tr key={order.id} className="hover:bg-primary-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-primary-900 mb-1">{order.id}</p>
                    <p className="text-sm font-medium text-primary-700">{order.address?.full_name || order.guest_email}</p>
                    <p className="text-xs text-primary-500">{order.guest_email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-primary-600">{order.created_at ? new Date(order.created_at).toLocaleString() : '-'}</td>
                  <td className="px-6 py-4 text-sm font-bold text-primary-900">₹{Number(order.total_amount || 0).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold rounded-full px-2.5 py-1 ${getStatusColor(order.status)}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <AdminOrderActions orderId={order.id} />
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
