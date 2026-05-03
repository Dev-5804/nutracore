'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { useCartStore } from '@/store/cart'
import { Check, ShoppingCart, Plus, Minus, ShieldCheck, Truck, RefreshCw, X } from 'lucide-react'

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedWeight, setSelectedWeight] = useState(product.weight_options[0])
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = () => {
    addItem(product, quantity, selectedWeight)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="relative flex flex-col lg:flex-row gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-primary-100 mt-20 md:mt-24 mb-10 max-w-7xl mx-auto">
      
      {/* Close/Back Button */}
      <Link 
        href="/products"
        className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-primary-50 text-primary-900 rounded-full hover:bg-primary-100 transition-colors z-10"
        title="Back to Products"
      >
        <X className="h-6 w-6" />
      </Link>

      {/* Product Image */}
      <div className="w-full lg:w-1/2">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-primary-50">
          <Image
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="mb-2">
          <span className="text-sm font-bold tracking-wider text-accent uppercase">
            {product.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4 tracking-tight">
          {product.name}
        </h1>
        
        <div className="flex items-center space-x-4 mb-6">
          {product.discount_price ? (
            <>
              <span className="text-3xl font-bold text-primary-900">₹{product.discount_price}</span>
              <span className="text-xl text-primary-400 line-through">₹{product.price}</span>
            </>
          ) : (
            <span className="text-3xl font-bold text-primary-900">₹{product.price}</span>
          )}
        </div>

        <p className="text-lg text-primary-600 mb-8 leading-relaxed">
          {product.description}
        </p>

        {/* Weight Options */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-primary-900 mb-3">Select Size</h3>
          <div className="flex flex-wrap gap-3">
            {product.weight_options.map(weight => (
              <button
                key={weight}
                onClick={() => setSelectedWeight(weight)}
                className={`px-5 py-2.5 rounded-full border-2 font-medium transition-all ${
                  selectedWeight === weight 
                    ? 'border-primary-900 bg-primary-900 text-white' 
                    : 'border-primary-200 text-primary-700 hover:border-primary-400 hover:bg-primary-50'
                }`}
              >
                {weight}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex items-center border-2 border-primary-200 rounded-full bg-white h-14">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 text-primary-600 hover:text-primary-900 transition-colors h-full flex items-center justify-center"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center font-semibold text-primary-900">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 text-primary-600 hover:text-primary-900 transition-colors h-full flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex-1 h-14 rounded-full font-bold text-lg flex items-center justify-center transition-all ${
              isAdded 
                ? 'bg-green-500 text-white' 
                : 'bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </>
            )}
          </button>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-t border-primary-100">
          <div className="flex items-center text-primary-700">
            <ShieldCheck className="h-5 w-5 mr-3 text-accent" />
            <span className="text-sm font-medium">100% Quality Guarantee</span>
          </div>
          <div className="flex items-center text-primary-700">
            <Truck className="h-5 w-5 mr-3 text-accent" />
            <span className="text-sm font-medium">Fast Nationwide Delivery</span>
          </div>
          <div className="flex items-center text-primary-700">
            <RefreshCw className="h-5 w-5 mr-3 text-accent" />
            <span className="text-sm font-medium">Easy Returns policy</span>
          </div>
        </div>

      </div>
    </div>
  )
}
