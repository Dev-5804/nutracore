import { NextResponse } from 'next/server'
import { deleteOrder } from '@/lib/actions/orders'

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const orderId = id
  if (!orderId) {
    return NextResponse.json({ error: 'Missing order id' }, { status: 400 })
  }

  const result = await deleteOrder(orderId)
  if (result?.error) {
    console.error('Delete order API failed:', result.error)
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
