'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, GraduationCap, ClipboardList } from 'lucide-react'

export default function GuruDashboard() {
  const [guruNIP, setGuruNIP] = useState('')
  const [guruNama, setGuruNama] = useState('Nama Guru')

  useEffect(() => {
    const nip = localStorage.getItem('guruNIP')
    const nama = localStorage.getItem('guruNama')
    if (nip) setGuruNIP(nip)
    if (nama) setGuruNama(nama)
  }, [])

  return (
    <div className="space-y-6 p-6 pb-16">
      <h1 className="text-3xl font-bold">Selamat Datang, {guruNama}!</h1>
      
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardHeader>
          <CardTitle>Profil Guru</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="w-20 h-20 border-2 border-white">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
            <AvatarFallback>{guruNama.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{guruNama}</h2>
            <p className="text-blue-100 font-semibold">NIP: {guruNIP}</p>
            <div className="mt-2 space-x-2">
              <Badge variant="secondary" className="bg-blue-400 text-white">RPL</Badge>
              <Badge variant="secondary" className="bg-blue-400 text-white">TKRO</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jadwal Hari Ini</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>08:00 - 09:30 : Pemrograman Dasar (X RPL)</li>
              <li>10:00 - 11:30 : Basis Data (XI RPL)</li>
              <li>13:00 - 14:30 : Pemrograman Web (XII RPL)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kelas yang Diampu</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>X RPL</li>
              <li>XI RPL</li>
              <li>XII RPL</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penilaian & Absensi</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Matematika: 3 nilai belum diisi</li>
              <li>Bahasa Indonesia: 5 absensi belum dicatat</li>
              <li>IPA: Semua nilai dan absensi terisi</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

