import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/actions/products";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="w-full bg-background selection:bg-primary-900 selection:text-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-primary-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/seeds_dry_fruits_nuts.webp"
            alt="Premium dry fruits background"
            fill
            sizes="100vw"
            className="object-cover opacity-50 scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-16">
          <p className="text-primary-200 tracking-[0.3em] uppercase text-sm mb-6 font-medium animate-fade-in-up">
            Finest Selection
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white mb-8 leading-tight tracking-tight max-w-5xl mx-auto drop-shadow-lg text-balance">
            Nature&apos;s <em className="italic font-light">Finest</em>, <br />
            Curated.
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Discover our artisanal collection of hand-picked dry fruits and nuts. Nourishment meets extraordinary flavor.
          </p>
          <Link 
            href="/products" 
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-primary-900 font-medium tracking-wider uppercase text-sm overflow-hidden transition-all duration-500 hover:bg-transparent hover:text-white border border-white"
          >
            <span className="relative z-10 flex items-center">
              Explore Collection
              <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100 z-0" />
          </Link>
        </div>
      </section>

      {/* Editorial Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src="/artisanal_nuts.webp"
                  alt="Artisanal nuts"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={100}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-100 -z-10" />
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <p className="text-accent tracking-[0.2em] uppercase text-xs font-bold mb-4">Our Philosophy</p>
              <h2 className="font-serif text-4xl md:text-5xl text-primary-900 mb-8 leading-tight">
                Uncompromising Quality from Soil to Table.
              </h2>
              <div className="space-y-6 text-primary-600 leading-relaxed text-lg font-light">
                <p>
                  We believe that the best flavors come from the best sources. That&apos;s why we travel the globe to partner directly with generational farmers who share our dedication to organic, sustainable practices.
                </p>
                <p>
                  Every almond, cashew, and walnut in our collection is meticulously sorted and roasted to perfection, ensuring that when you open a box of Nutracore, you experience nothing but pristine quality.
                </p>
              </div>
              <Link 
                href="/about" 
                className="inline-flex items-center mt-10 text-primary-900 border-b border-primary-900 pb-1 font-medium hover:text-accent hover:border-accent transition-colors"
              >
                Read our story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-5xl text-primary-900 mb-4">The Curated Selection</h2>
              <p className="text-primary-600 text-lg font-light">
                Our most sought-after varieties, perfect for gifting or elevating your daily ritual.
              </p>
            </div>
            <Link 
              href="/products" 
              className="group inline-flex items-center text-primary-900 font-medium tracking-widest uppercase text-xs"
            >
              View entire collection
              <span className="ml-3 h-px w-12 bg-primary-900 group-hover:w-20 transition-all duration-300" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter / CTA */}
      <section className="py-32 bg-primary-900 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">Join the Nutracore Society</h2>
          <p className="text-primary-200 mb-10 text-lg font-light">Subscribe to receive exclusive access to limited harvests and curated nutritional guides.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-6 py-4 bg-transparent border border-primary-600 text-white placeholder-primary-400 focus:outline-none focus:border-accent transition-colors"
            />
            <button className="px-8 py-4 bg-accent text-white font-medium tracking-widest uppercase text-sm hover:bg-white hover:text-primary-900 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
