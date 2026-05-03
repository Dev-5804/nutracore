'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function AdminOrderActions({ orderId }: { orderId: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Remove this order?')) return
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderId)}`, {
        method: 'POST',
        cache: 'no-store'
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to delete order')
      }

      router.refresh()
    } catch (err: any) {
      console.error(err)
      alert(err?.message || 'Failed to delete order')
    } finally {
      setIsDeleting(false)
    }
   }

  return (
    <div className="inline-flex items-center gap-2">
      <Link
        href={`/admin/orders/${encodeURIComponent(orderId)}`}
        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-primary-700 bg-white border border-primary-200 rounded-md hover:bg-primary-50 transition-colors"
      >
        <Eye className="w-3.5 h-3.5 mr-1.5" />
        View
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-white border border-red-200 rounded-md hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Trash2 className="w-3.5 h-3.5 mr-1.5" />
        {isDeleting ? 'Removing...' : 'Remove'}
      </button>
    </div>
  )
}
