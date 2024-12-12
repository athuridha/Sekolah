'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { BottomNav } from '@/components/BottomNav'
import { Toaster } from "@/components/ui/toaster"

export default function GuruLayout({ children }: { children: React.ReactNode }) {
  const [isGuru, setIsGuru] = useState(false)
  const [guruNIP, setGuruNIP] = useState('')
  const router = useRouter()

  const handleLogout = useCallback(() => {
    localStorage.removeItem('guruNIP')
    localStorage.removeItem('guruNama')
    router.push('/')
  }, [router])

  useEffect(() => {
    const checkGuruStatus = () => {
      const nip = localStorage.getItem('guruNIP')
      if (nip) {
        setIsGuru(true)
        setGuruNIP(nip)
      } else {
        router.push('/')
      }
    }
    checkGuruStatus()
  }, [router])

  if (!isGuru) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>
      <BottomNav onLogout={handleLogout} />
      <Toaster />
    </div>
  )
}

