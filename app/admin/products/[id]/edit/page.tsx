import { getProduct } from '@/lib/actions/products'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { updateProduct } from '@/lib/actions/products'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin/products" className="text-primary-600 hover:text-primary-900 transition-colors mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-serif text-primary-900">Edit Product</h1>
      </div>

      <form action={updateProduct} className="space-y-6 bg-white p-8 rounded-xl border border-primary-200 shadow-sm">
        <input type="hidden" name="id" value={product.id} />
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary-900 mb-2">Product Name</label>
          <input type="text" id="name" name="name" defaultValue={product.name} required className="w-full px-4 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-900 text-primary-900 bg-white" />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-primary-900 mb-2">Description</label>
          <textarea id="description" name="description" defaultValue={product.description} rows={4} className="w-full px-4 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-900 text-primary-900 bg-white"></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-primary-900 mb-2">Price (₹)</label>
            <input type="number" id="price" name="price" defaultValue={product.price} step="0.01" required className="w-full px-4 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-900 text-primary-900 bg-white" />
          </div>
          <div>
            <label htmlFor="discount_price" className="block text-sm font-medium text-primary-900 mb-2">Discount Price (₹)</label>
            <input type="number" id="discount_price" name="discount_price" defaultValue={product.discount_price || ''} step="0.01" className="w-full px-4 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-900 text-primary-900 bg-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-primary-900 mb-2">Category</label>
            <input type="text" id="category" name="category" defaultValue={product.category} required className="w-full px-4 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-900 text-primary-900 bg-white" />
          </div>
          <div>
            <label htmlFor="stock_quantity" className="block text-sm font-medium text-primary-900 mb-2">Stock Quantity</label>
            <input type="number" id="stock_quantity" name="stock_quantity" defaultValue={product.stock_quantity} required className="w-full px-4 py-2 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-900 text-primary-900 bg-white" />
          </div>
        </div>

        <div className="pt-4 flex justify-end space-x-4">
          <Link href="/admin/products" className="px-6 py-2 rounded-lg border border-primary-200 text-primary-900 font-medium hover:bg-primary-50 transition-colors">
            Cancel
          </Link>
          <button type="submit" className="px-6 py-2 rounded-lg bg-primary-900 text-white font-medium hover:bg-primary-800 transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}