import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { getProducts, deleteProduct } from '@/lib/actions/products'

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-primary-900 mb-2">Products</h1>
          <p className="text-primary-600">Manage your store&apos;s inventory and product listings</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="inline-flex items-center px-4 py-2 bg-primary-900 text-white text-sm font-medium rounded-lg hover:bg-primary-800 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-primary-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-50/50 text-primary-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100">
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-primary-500">
                    No products found. Add your first product!
                  </td>
                </tr>
              )}
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-primary-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-primary-100 flex-shrink-0">
                        <Image
                          src={product.images?.[0] || '/placeholder.svg'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-900">{product.name}</p>
                        <p className="text-xs text-primary-500 truncate max-w-[200px]">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-primary-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-primary-900 font-medium">
                    {product.discount_price ? (
                      <div className="flex flex-col">
                        <span>₹{product.discount_price}</span>
                        <span className="text-xs text-primary-400 line-through">₹{product.price}</span>
                      </div>
                    ) : (
                      <span>₹{product.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      product.stock_quantity > 10 ? 'bg-green-100 text-green-800' : 
                      product.stock_quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock_quantity} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="p-2 text-primary-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form action={async () => {
                        'use server'
                        await deleteProduct(product.id)
                      }}>
                        <button type="submit" className="p-2 text-primary-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
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
