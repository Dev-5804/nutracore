'use server'

import { createAdminClient, createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createGuestOrder(orderData: any, items: any[], addressData: any) {
  const supabase = await createClient()

  // 1. Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        guest_email: orderData.email,
        total_amount: orderData.total,
        status: 'Pending'
      }
    ])
    .select()
    .single()

  if (orderError || !order) {
    console.error('Order creation failed:', orderError)
    // Return the underlying error message for debugging
    return { error: orderError?.message || JSON.stringify(orderError) || 'Failed to create order' }
  }

  // 2. Create order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.product.id,
    quantity: item.quantity,
    price: item.product.discount_price || item.product.price,
    weight_option: item.selectedWeight
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    console.error('Order items creation failed:', itemsError)
    // include items error in response for debugging
    return { error: itemsError?.message || JSON.stringify(itemsError) }
  }

  // 3. Create address
  const { error: addressError } = await supabase
    .from('addresses')
    .insert([
      {
        guest_email: orderData.email,
        full_name: addressData.firstName + ' ' + addressData.lastName,
        phone_number: addressData.phone,
        address_line: addressData.address,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode
      }
    ])

  if (addressError) {
    console.error('Address creation failed:', addressError)
    return { error: addressError?.message || JSON.stringify(addressError) }
  }

  revalidatePath('/admin/orders')
  return { success: true }
}

export async function getOrders() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      guest_email,
      total_amount,
      status,
      created_at
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  // Fetch addresses manually since no direct foreign key
  const { data: addresses } = await supabase
    .from('addresses')
    .select('guest_email, full_name, phone_number, city')
    .order('created_at', { ascending: false })

  // Map addresses to orders by guest_email
  const ordersWithAddress = data.map(order => {
    const address = addresses?.find(a => a.guest_email === order.guest_email)
    return {
      ...order,
      address
    }
  })

  return ordersWithAddress
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  if (error) {
    console.error('Error updating order:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/orders')
  return { success: true }
}

export async function deleteOrder(orderId: string) {
  let supabase

  try {
    supabase = createAdminClient()
  } catch (error: any) {
    console.error('Admin client unavailable:', error?.message || error)
    return { error: 'Admin delete not available. Missing service role key.' }
  }

  const { data, error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId)
    .select('id')

  if (error) {
    console.error('Error deleting order:', error)
    return { error: error.message }
  }

  if (!data || data.length === 0) {
    console.error('Delete returned no rows for order:', orderId)
    return { error: 'Order not found or not deleted' }
  }

  console.info('Order deleted:', orderId)

  revalidatePath('/admin/orders')
  revalidatePath(`/admin/orders/${orderId}`)
  revalidatePath('/admin')
  return { success: true }
}

export async function getOrderById(orderId: string) {
  const supabase = await createClient()
  const normalizedId = orderId.trim()
  const uuidRegex = /^[0-9a-fA-F-]{36}$/

  if (!uuidRegex.test(normalizedId)) {
    return { order: null, error: `Invalid order id: ${normalizedId}` }
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id, guest_email, total_amount, status, created_at')
    .eq('id', normalizedId)
    .maybeSingle()

  if (orderError || !order) {
    console.error('Error fetching order:', orderError?.message || orderError)
    const message = orderError?.message || `Order not found for id: ${normalizedId}`
    return { order: null, error: message }
  }

  const { data: address } = await supabase
    .from('addresses')
    .select('guest_email, full_name, phone_number, address_line, city, state, pincode')
    .eq('guest_email', order.guest_email)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: orderItems } = await supabase
    .from('order_items')
    .select('product_id, quantity, price, weight_option, product:products(id, name, price, discount_price, images)')
    .eq('order_id', order.id)

  const normalizedItems = (orderItems || []).map((item: any) => {
    const product = Array.isArray(item.product) ? item.product[0] : item.product
    return { ...item, product }
  })

  return {
    order: {
      ...order,
      address,
      items: normalizedItems
    },
    error: null
  }
}
