export interface Product {
  id: string
  name: string
  description?: string
  price: number
  discount_price?: number
  stock_quantity: number
  category: string
  images: string[]
  weight_options: string[]
  created_at?: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedWeight: string
}
