'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function Back({ label = "Kembali" }) {
    const router = useRouter()
    const pathname = usePathname()

    const parentPath = pathname
    .split('/')
    .slice(0, -1)
    .join('/') || '/'

    return (
      <button
        onClick={() => router.back(parentPath)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-sky-50 rounded-xl transition"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>{label}</span>
      </button>
    )
}   
