import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'

export default function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images?.[0] || '/placeholder.svg'
  
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="flex flex-col h-full bg-transparent">
        <div className="relative aspect-[4/5] overflow-hidden bg-primary-100 mb-6">
          {product.discount_price && (
            <div className="absolute top-4 left-4 z-10 bg-accent/90 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase font-medium px-3 py-1.5 rounded-sm">
              Sale
            </div>
          )}
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="flex flex-col items-center text-center flex-grow">
          <p className="text-[11px] text-primary-500 uppercase tracking-[0.2em] mb-3">{product.category}</p>
          <h3 className="font-serif text-xl text-primary-900 mb-2 leading-tight">{product.name}</h3>
          
          <div className="mt-auto flex items-center justify-center space-x-3 pt-2">
            {product.discount_price ? (
              <>
                <span className="text-lg text-primary-900">₹{product.discount_price}</span>
                <span className="text-sm text-primary-400 line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="text-lg text-primary-900">₹{product.price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
