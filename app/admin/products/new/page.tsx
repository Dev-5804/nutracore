'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createProduct } from '@/lib/actions/products'

export default function NewProductPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const formData = new FormData(e.currentTarget)
      await createProduct(formData)
      router.push('/admin/products')
    } catch (error) {
      console.error(error)
      alert("Failed to create product")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <Link 
          href="/admin/products"
          className="p-2 text-primary-400 hover:text-primary-900 hover:bg-primary-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif text-primary-900 mb-1">Add New Product</h1>
          <p className="text-primary-600 text-sm">Create a new product listing in your catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-primary-200 shadow-sm space-y-8">
          
          {/* Basic Info Section */}
          <div>
            <h2 className="text-lg font-bold text-primary-900 mb-4 pb-2 border-b border-primary-100">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-primary-700">Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="e.g. Premium California Almonds"
                  className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-primary-900 bg-white"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-primary-700">Description</label>
                <textarea 
                  name="description"
                  rows={4}
                  placeholder="Describe the origin, taste, and benefits..."
                  className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-primary-900 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-700">Category</label>
                <select name="category" required className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-primary-900 bg-white">
                  <option value="">Select a category</option>
                  <option value="Almonds">Almonds</option>
                  <option value="Cashews">Cashews</option>
                  <option value="Walnuts">Walnuts</option>
                  <option value="Pistachios">Pistachios</option>
                  <option value="Raisins">Raisins</option>
                  <option value="Dates">Dates</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div>
            <h2 className="text-lg font-bold text-primary-900 mb-4 pb-2 border-b border-primary-100">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-700">Price (₹)</label>
                <input 
                  type="number" 
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-primary-900 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-700">Discount Price (₹)</label>
                <input 
                  type="number" 
                  name="discount_price"
                  min="0"
                  step="0.01"
                  placeholder="0.00 (Optional)"
                  className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-primary-900 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary-700">Stock Quantity</label>
                <input 
                  type="number" 
                  name="stock_quantity"
                  required
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-primary-900 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div>
            <h2 className="text-lg font-bold text-primary-900 mb-4 pb-2 border-b border-primary-100">Media</h2>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-primary-700">Image URL</label>
              <input 
                type="url" 
                name="image_url"
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all text-primary-900 bg-white"
              />
              <p className="text-xs text-primary-500 mt-1">For MVP, just paste an external image URL here.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link 
            href="/admin/products"
            className="px-6 py-2.5 border border-primary-200 text-primary-700 font-medium rounded-lg hover:bg-primary-50 transition-colors"
          >
            Cancel
          </Link>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="flex items-center px-6 py-2.5 bg-primary-900 text-white font-medium rounded-lg hover:bg-primary-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  )
}
