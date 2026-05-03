import { getProduct } from '@/lib/actions/products'
import ProductDetailClient from './ProductDetailClient'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)
  
  if (!product) {
    return { title: 'Product Not Found | Nutracore' }
  }
  
  return {
    title: `${product.name} | Nutracore`,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailClient product={product} />
      </div>
    </div>
  )
}
