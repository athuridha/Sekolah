'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function AdminProfile() {
  const [adminUsername, setAdminUsername] = useState('')
  const router = useRouter()

  useEffect(() => {
    const username = localStorage.getItem('adminUsername')
    if (username) {
      setAdminUsername(username)
    } else {
      router.push('/')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminUsername')
    router.push('/')
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Profil Admin</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder-admin-avatar.jpg" alt="Avatar" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Admin</h2>
            <p className="text-gray-500">Username: {adminUsername}</p>
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Email:</strong> admin@example.com</p>
          <p><strong>Role:</strong> Super Admin</p>
          <p><strong>Last Login:</strong> {new Date().toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Akses dan Hak Istimewa</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>Manajemen Guru</li>
            <li>Manajemen Siswa</li>
            <li>Manajemen Mata Pelajaran</li>
            <li>Penjadwalan Kelas</li>
            <li>Laporan Nilai dan Absensi</li>
            <li>Konfigurasi Sistem</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

