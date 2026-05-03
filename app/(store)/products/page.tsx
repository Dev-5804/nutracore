import ProductCard from '@/components/ProductCard'
import { Leaf } from 'lucide-react'
import { getProducts } from '@/lib/actions/products'

export const metadata = {
  title: 'Products | Nutracore',
  description: 'Browse our premium selection of dry fruits and nuts.'
}

export default async function ProductsPage() {
  const products = await getProducts()
  
  return (
    <div className="bg-background min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full text-primary-600 mb-4">
            <Leaf className="h-6 w-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-4">Our Selection</h1>
          <p className="text-lg text-primary-600">
            Explore our curated collection of the finest dry fruits and nuts. Quality you can taste in every bite.
          </p>
        </div>

        {/* Filters (Mock UI for now) */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button className="px-6 py-2 rounded-full bg-primary-900 text-white font-medium">All</button>
          <button className="px-6 py-2 rounded-full bg-white border border-primary-200 text-primary-700 font-medium hover:bg-primary-50 transition-colors">Almonds</button>
          <button className="px-6 py-2 rounded-full bg-white border border-primary-200 text-primary-700 font-medium hover:bg-primary-50 transition-colors">Cashews</button>
          <button className="px-6 py-2 rounded-full bg-white border border-primary-200 text-primary-700 font-medium hover:bg-primary-50 transition-colors">Raisins</button>
          <button className="px-6 py-2 rounded-full bg-white border border-primary-200 text-primary-700 font-medium hover:bg-primary-50 transition-colors">Walnuts</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  )
}
