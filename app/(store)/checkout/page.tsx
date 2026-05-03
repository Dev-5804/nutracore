'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cart'
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react'

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [addressLine, setAddressLine] = useState('')
  const [city, setCity] = useState('')
  const [stateVal, setStateVal] = useState('')
  const [pincode, setPincode] = useState('')

  useEffect(() => {
    setMounted(true)
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items.length, router])

  if (!mounted || items.length === 0) return null

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    const orderData = {
      email,
      phone,
      total: getTotal()
    }

    const addressData = {
      firstName,
      lastName,
      phone,
      address: addressLine,
      city,
      state: stateVal,
      pincode
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderData, items, addressData })
      })

      const json = await res.json()
      if (!res.ok || json.error) {
        throw new Error(json.error || 'Failed to create order')
      }

      clearCart()
      setIsProcessing(false)
      alert('Order placed successfully')
      router.push('/')
    } catch (err: any) {
      console.error('Order creation failed:', err)
      setIsProcessing(false)
      alert('Failed to place order. Please try again.')
    }
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 tracking-tight">Checkout</h1>
          <div className="flex items-center text-primary-500 bg-primary-100 px-4 py-2 rounded-full text-sm font-medium">
            <Lock className="h-4 w-4 mr-2" />
            Secure Checkout
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Section */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handlePlaceOrder} className="bg-white rounded-3xl shadow-sm border border-primary-100 p-8">
              
              <div className="mb-10">
                <h2 className="text-xl font-bold text-primary-900 mb-6 pb-2 border-b border-primary-100">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">Email Address *</label>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">Phone Number *</label>
                    <input required value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-xl font-bold text-primary-900 mb-6 pb-2 border-b border-primary-100">Shipping Address</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">First Name *</label>
                      <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">Last Name *</label>
                      <input required value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-2">Address Line 1 *</label>
                    <input required value={addressLine} onChange={(e) => setAddressLine(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="House number and street name" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">City *</label>
                      <input required value={city} onChange={(e) => setCity(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">State *</label>
                      <input required value={stateVal} onChange={(e) => setStateVal(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="State" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-2">PIN Code *</label>
                      <input required value={pincode} onChange={(e) => setPincode(e.target.value)} type="text" className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all" placeholder="XXXXXX" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-primary-100">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full h-14 rounded-full font-bold text-lg flex items-center justify-center transition-all ${
                    isProcessing 
                      ? 'bg-primary-300 text-white cursor-not-allowed' 
                      : 'bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {isProcessing ? 'Processing Payment...' : 'Pay Now via Razorpay (Mock)'}
                  {!isProcessing && <ArrowRight className="ml-2 h-5 w-5" />}
                </button>
                <div className="mt-4 flex justify-center items-center text-primary-500 text-sm">
                  <ShieldCheck className="h-4 w-4 mr-1" />
                  Your payment information is processed securely.
                </div>
              </div>

            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-primary-100 p-8 sticky top-24">
              <h2 className="text-xl font-bold text-primary-900 mb-6">Order Summary ({items.reduce((a,c) => a + c.quantity, 0)} items)</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.selectedWeight}`} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded bg-primary-50 overflow-hidden">
                        <img src={item.product.images[0]} alt={item.product.name} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <p className="font-medium text-primary-900">{item.product.name}</p>
                        <p className="text-primary-500">{item.selectedWeight} x {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium text-primary-900">
                      ₹{(item.product.discount_price || item.product.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-primary-100 pt-6 space-y-4 text-primary-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-primary-900">₹{getTotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>
              
              <div className="border-t border-primary-100 pt-6 mt-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-primary-900">Total</span>
                  <span className="font-bold text-2xl text-primary-900">₹{getTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
