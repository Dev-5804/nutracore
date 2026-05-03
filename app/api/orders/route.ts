import { NextResponse } from 'next/server'
import { createGuestOrder } from '@/lib/actions/orders'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderData, items, addressData } = body

    if (!orderData || !items || !addressData) {
      return NextResponse.json({ error: 'Missing payload' }, { status: 400 })
    }

    const result = await createGuestOrder(orderData, items, addressData)

    if (result?.error) {
      console.error('/api/orders createGuestOrder error:', result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('API /orders error:', error)
    return NextResponse.json({ error: error?.message || 'Unknown error' }, { status: 500 })
  }
}
