'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-background">
        <div className="h-24 w-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-400 mb-6">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold text-primary-900 mb-4">Your cart is empty</h1>
        <p className="text-primary-600 mb-8 max-w-md text-center">
          Looks like you haven&apos;t added any of our premium dry fruits to your cart yet.
        </p>
        <Link 
          href="/products" 
          className="inline-flex items-center px-8 py-4 bg-primary-900 hover:bg-primary-800 text-white font-medium rounded-full transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-10 tracking-tight">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-primary-100 overflow-hidden">
              <ul className="divide-y divide-primary-100">
                {items.map((item) => {
                  const price = item.product.discount_price || item.product.price
                  
                  return (
                    <li key={`${item.product.id}-${item.selectedWeight}`} className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                      <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-primary-50 flex-shrink-0">
                        <Image
                          src={item.product.images[0] || '/placeholder.svg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                        <div className="flex justify-between w-full flex-col sm:flex-row gap-2 mb-2">
                          <Link href={`/products/${item.product.id}`} className="font-semibold text-lg text-primary-900 hover:text-accent transition-colors">
                            {item.product.name}
                          </Link>
                          <span className="font-bold text-primary-900 text-lg">₹{price * item.quantity}</span>
                        </div>
                        
                        <p className="text-sm text-primary-500 mb-4">{item.selectedWeight}</p>
                        
                        <div className="flex items-center justify-between w-full mt-auto">
                          <div className="flex items-center border border-primary-200 rounded-full h-10 w-32 bg-white">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.selectedWeight, Math.max(1, item.quantity - 1))}
                              className="px-3 text-primary-600 hover:text-primary-900 h-full flex items-center justify-center transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="flex-1 text-center font-medium text-sm text-primary-900">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.selectedWeight, item.quantity + 1)}
                              className="px-3 text-primary-600 hover:text-primary-900 h-full flex items-center justify-center transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeItem(item.product.id, item.selectedWeight)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors ml-4"
                            title="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-primary-100 p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-primary-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-primary-900">₹{getTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm text-primary-500">
                  <span>Tax included in price</span>
                </div>
              </div>
              
              <div className="border-t border-primary-100 pt-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg text-primary-900">Total</span>
                  <span className="font-bold text-2xl text-primary-900">₹{getTotal()}</span>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="w-full h-14 rounded-full font-bold text-lg flex items-center justify-center transition-all bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
