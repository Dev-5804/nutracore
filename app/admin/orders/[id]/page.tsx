import Link from 'next/link'
import { getOrderById } from '@/lib/actions/orders'

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const decodedId = decodeURIComponent(id)
  const { order, error } = await getOrderById(decodedId)

  if (!order) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif text-primary-900 mb-2">Order Not Found</h1>
          <p className="text-primary-600">We could not find this order.</p>
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          <p className="text-sm text-primary-500 mt-2">Order ID: {decodedId}</p>
        </div>
        <Link href="/admin/orders" className="text-primary-700 hover:underline">
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-primary-900 mb-2">Order Details</h1>
          <p className="text-primary-600">Order ID: {order.id}</p>
        </div>
        <Link href="/admin/orders" className="text-primary-700 hover:underline">
          Back to Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-primary-200 shadow-sm p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-primary-900 mb-4">Items</h2>
          <div className="space-y-4">
            {order.items.length === 0 && (
              <p className="text-sm text-primary-500">No items found for this order.</p>
            )}
            {order.items.map((item, idx) => (
              <div key={`${item.product_id}-${idx}`} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.product?.images?.[0] && (
                    <div className="relative w-12 h-12 rounded bg-primary-50 overflow-hidden">
                      <img src={item.product.images[0]} alt={item.product?.name || 'Product'} className="object-cover w-full h-full" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-primary-900">{item.product?.name || `Product ID: ${item.product_id}`}</p>
                    <p className="text-xs text-primary-500">Weight: {item.weight_option || '-'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-primary-700">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold text-primary-900">₹{Number(item.price || 0).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-primary-200 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-primary-900 mb-2">Summary</h2>
            <p className="text-sm text-primary-600">Status: {order.status}</p>
            <p className="text-sm text-primary-600">Placed: {order.created_at ? new Date(order.created_at).toLocaleString() : '-'}</p>
            <p className="text-sm font-semibold text-primary-900">Total: ₹{Number(order.total_amount || 0).toLocaleString()}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-primary-900 mb-2">Customer</h2>
            <p className="text-sm text-primary-600">{order.address?.full_name || order.guest_email}</p>
            <p className="text-sm text-primary-600">{order.guest_email}</p>
            <p className="text-sm text-primary-600">{order.address?.phone_number || '-'}</p>
            <p className="text-sm text-primary-600">
              {order.address
                ? `${order.address.address_line}, ${order.address.city}, ${order.address.state} ${order.address.pincode}`
                : '-'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
