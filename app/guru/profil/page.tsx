'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function GuruProfile() {
  const [guruNIP, setGuruNIP] = useState('')
  const [guruNama, setGuruNama] = useState('Nama Guru')
  const router = useRouter()

  useEffect(() => {
    const nip = localStorage.getItem('guruNIP')
    const nama = localStorage.getItem('guruNama')
    if (nip) {
      setGuruNIP(nip)
    } else {
      router.push('/')
    }
    if (nama) setGuruNama(nama)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('guruNIP')
    localStorage.removeItem('guruNama')
    router.push('/')
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      <h1 className="text-3xl font-bold">Profil Guru</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
            <AvatarFallback>{guruNama.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{guruNama}</h2>
            <p className="text-gray-500 font-semibold">NIP: {guruNIP}</p>
          </div>
          <div className="flex space-x-2">
            <Badge>RPL</Badge>
            <Badge>TKRO</Badge>
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Keluar
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detail Kontak</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Email:</strong> guru@sekolah.sch.id</p>
          <p><strong>No. Telepon:</strong> 081234567890</p>
          <p><strong>Alamat:</strong> Jl. Pendidikan No. 123, Kota Belajar</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mata Pelajaran yang Diampu</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>Pemrograman Dasar</li>
            <li>Basis Data</li>
            <li>Pemrograman Web</li>
            <li>Jaringan Komputer</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kualifikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Pendidikan Terakhir:</strong> S1 Teknik Informatika</p>
          <p><strong>Sertifikasi:</strong> Sertifikasi Guru Profesional</p>
          <p><strong>Pengalaman Mengajar:</strong> 5 tahun</p>
        </CardContent>
      </Card>
    </div>
  )
}

