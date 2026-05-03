import { Product } from '@/types'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Afghan Almonds',
    description: 'High-quality crunchy almonds sourced directly from the best farms in Afghanistan. Packed with nutrients and perfect for a daily healthy snack.',
    price: 899,
    stock_quantity: 100,
    category: 'Almonds',
    images: ['https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=800'],
    weight_options: ['250g', '500g', '1kg']
  },
  {
    id: '2',
    name: 'Jumbo Cashews',
    description: 'Large, meticulously roasted and lightly salted cashews. These premium grade cashews offer a rich, buttery flavor.',
    price: 1199,
    discount_price: 1099,
    stock_quantity: 50,
    category: 'Cashews',
    images: ['https://images.unsplash.com/photo-1596591391512-882298c4b2b6?q=80&w=800'],
    weight_options: ['250g', '500g', '1kg']
  },
  {
    id: '3',
    name: 'Golden Raisins',
    description: 'Sweet, juicy, and plump golden raisins perfect for snacking, baking, or adding to your morning cereal.',
    price: 450,
    stock_quantity: 200,
    category: 'Raisins',
    images: ['https://images.unsplash.com/photo-1599859553641-a18544edcce5?q=80&w=800'],
    weight_options: ['250g', '500g', '1kg']
  },
  {
    id: '4',
    name: 'California Walnuts',
    description: 'Brain-boosting fresh California walnuts. Excellent source of Omega-3 fatty acids and antioxidants.',
    price: 1250,
    stock_quantity: 75,
    category: 'Walnuts',
    images: ['https://images.unsplash.com/photo-1595305141071-92b0051e7fb2?q=80&w=800'],
    weight_options: ['250g', '500g', '1kg']
  },
  {
    id: '5',
    name: 'Pistachios (Salted)',
    description: 'Premium roasted and lightly salted pistachios in shell. A classic and irresistible crunchy treat.',
    price: 1350,
    stock_quantity: 80,
    category: 'Pistachios',
    images: ['https://images.unsplash.com/photo-1594220556209-6441b4bba895?q=80&w=800'],
    weight_options: ['250g', '500g', '1kg']
  }
]
