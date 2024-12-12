'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

const TEMP_ADMIN = {
  username: 'admin',
  password: 'admin'
}

const TEMP_GURU = [
  { nip: '2001', password: 'pass2001', nama: 'Agus Setiawan' },
  { nip: '2002', password: 'pass2002', nama: 'Budi Hartono' },
  { nip: '2003', password: 'pass2003', nama: 'Citra Lestari' },
  { nip: '2004', password: 'pass2004', nama: 'Dewi Safitri' },
  { nip: '2005', password: 'pass2005', nama: 'Eko Prasetyo' },
  { nip: '2006', password: 'pass2006', nama: 'Fitriani' },
  { nip: '2007', password: 'pass2007', nama: 'Gunawan' },
  { nip: '2008', password: 'pass2008', nama: 'Hesti Wulandari' },
];

export default function Login() {
  const [guruNIP, setGuruNIP] = useState('')
  const [guruPassword, setGuruPassword] = useState('')
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    const storedAdminUsername = localStorage.getItem('adminUsername')
    const storedGuruNIP = localStorage.getItem('guruNIP')
    if (storedAdminUsername) {
      router.push('/admin')
    } else if (storedGuruNIP) {
      router.push('/guru')
    }
  }, [router])

  const handleGuruLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const guru = TEMP_GURU.find(g => g.nip === guruNIP && g.password === guruPassword)
    if (guru) {
      localStorage.setItem('guruNIP', guru.nip)
      localStorage.setItem('guruNama', guru.nama)
      router.push('/guru')
    } else {
      toast({
        title: "Login Gagal",
        description: "NIP atau password guru tidak valid.",
        variant: "destructive",
      })
    }
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (adminUsername === TEMP_ADMIN.username && adminPassword === TEMP_ADMIN.password) {
      localStorage.setItem('adminUsername', adminUsername)
      router.push('/admin')
    } else {
      toast({
        title: "Login Gagal",
        description: "Username atau password admin tidak valid.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login Aplikasi</CardTitle>
          <CardDescription className="text-center">
            Masuk sebagai guru atau admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="guru" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guru">Guru</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="guru">
              <form onSubmit={handleGuruLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guruNIP">NIP</Label>
                  <Input
                    id="guruNIP"
                    type="text"
                    placeholder="Masukkan NIP"
                    value={guruNIP}
                    onChange={(e) => setGuruNIP(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guruPassword">Password</Label>
                  <Input
                    id="guruPassword"
                    type="password"
                    placeholder="Masukkan password"
                    value={guruPassword}
                    onChange={(e) => setGuruPassword(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full" type="submit">
                  Login sebagai Guru
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminUsername">Username</Label>
                  <Input
                    id="adminUsername"
                    type="text"
                    placeholder="Masukkan username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Password</Label>
                  <Input
                    id="adminPassword"
                    type="password"
                    placeholder="Masukkan password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                </div>
                <Button className="w-full" type="submit">
                  Login sebagai Admin
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

