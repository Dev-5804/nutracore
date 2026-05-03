'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getProducts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data
}

export async function getProduct(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const price = parseFloat(formData.get('price') as string)
  const discountStr = formData.get('discount_price') as string
  const discount_price = discountStr ? parseFloat(discountStr) : null
  const stock_quantity = parseInt(formData.get('stock_quantity') as string, 10)
  
  // For MVP, we'll hardcode an image array if empty, or try to get it from a form field if we add one later
  const imageUrl = formData.get('image_url') as string
  const images = imageUrl ? [imageUrl] : ['/placeholder.svg']

  const { error } = await supabase
    .from('products')
    .insert([
      { 
        name, 
        description, 
        category, 
        price, 
        discount_price, 
        stock_quantity,
        images,
        // Default weight options for now
        weight_options: ['250g', '500g', '1kg']
      }
    ])

  if (error) {
    console.error('Error creating product:', error)
    throw new Error('Failed to create product')
  }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  revalidatePath('/')
  
  return { success: true }
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const category = formData.get('category') as string
  const price = parseFloat(formData.get('price') as string)
  const discountStr = formData.get('discount_price') as string
  const discount_price = discountStr ? parseFloat(discountStr) : null
  const stock_quantity = parseInt(formData.get('stock_quantity') as string, 10)

  const { error } = await supabase
    .from('products')
    .update({ 
      name, 
      description, 
      category, 
      price, 
      discount_price, 
      stock_quantity
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating product:', error)
    throw new Error('Failed to update product')
  }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  revalidatePath('/')
  
  // Since we're in a form action, we could redirect here or let the client handle it.
  // We'll import redirect dynamically at the top if needed, or simple redirect:
  const { redirect } = await import('next/navigation')
  redirect('/admin/products')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    throw new Error('Failed to delete product')
  }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  revalidatePath('/')
  
  return { success: true }
}
