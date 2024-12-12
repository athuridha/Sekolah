'use client'

import { useState, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Sample notifications data
const sampleNotifications = [
  { id: '1', judul: 'Rapat Guru', pesan: 'Rapat guru akan diadakan hari Jumat pukul 14:00.' },
  { id: '2', judul: 'Pengumpulan Nilai', pesan: 'Batas waktu pengumpulan nilai adalah hari Senin depan.' },
  { id: '3', judul: 'Libur Sekolah', pesan: 'Sekolah akan libur pada tanggal 17 Agustus untuk memperingati Hari Kemerdekaan.' },
]

// Type definitions for the props
interface NotifikasiProps {
  userRole: string;
  userId: string;
}

export default function Notifikasi({ userRole, userId }: NotifikasiProps) {
  const [notifikasi, setNotifikasi] = useState<any[]>([]) // You can further type this if needed
  const [showNotifikasi, setShowNotifikasi] = useState(false)

  useEffect(() => {
    // Simulate fetching notifications
    setTimeout(() => {
      setNotifikasi(sampleNotifications)
    }, 1000)
  }, [])

  return (
    <>
      <Button
        className="fixed top-4 right-4 rounded-full w-12 h-12 bg-white text-blue-500 hover:bg-blue-100 flex items-center justify-center shadow-lg"
        onClick={() => setShowNotifikasi(!showNotifikasi)}
      >
        <Bell size={24} />
        {notifikasi.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {notifikasi.length}
          </span>
        )}
      </Button>
      {showNotifikasi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-4">Notifikasi</h2>
              {notifikasi.length === 0 ? (
                <p>Tidak ada notifikasi baru.</p>
              ) : (
                notifikasi.map((n) => (
                  <div key={n.id} className="mb-4 p-3 bg-gray-100 rounded-lg">
                    <h3 className="font-bold">{n.judul}</h3>
                    <p>{n.pesan}</p>
                  </div>
                ))
              )}
              <Button className="w-full mt-4" onClick={() => setShowNotifikasi(false)}>
                Tutup
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
