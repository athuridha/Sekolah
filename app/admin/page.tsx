import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, GraduationCap } from 'lucide-react'
import { sampleClasses, sampleStudents, sampleTeachers } from '../../lib/sampleData'

export default function AdminDashboard() {
return (
  <div className="space-y-6">
    <h1 className="text-2xl md:text-3xl font-bold mb-4">Selamat Datang di Dashboard Admin!</h1>
    
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Jumlah Guru</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sampleTeachers.length}</div>
          <p className="text-xs text-muted-foreground">
            {sampleTeachers.length} guru aktif
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Jumlah Kelas</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sampleClasses.length}</div>
          <p className="text-xs text-muted-foreground">
            {sampleClasses.length} kelas aktif
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Jumlah Siswa</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sampleStudents.length}</div>
          <p className="text-xs text-muted-foreground">
            {sampleStudents.length} siswa terdaftar
          </p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Ringkasan</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Silakan pilih menu di sidebar untuk mengelola guru, siswa, atau lihat laporan.</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Jurusan</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside">
          <li>RPL (Rekayasa Perangkat Lunak)</li>
          <li>TKRO (Teknik Kendaraan Ringan Otomotif)</li>
          <li>OTKP (Otomatisasi dan Tata Kelola Perkantoran)</li>
          <li>TBSM (Teknik dan Bisnis Sepeda Motor)</li>
        </ul>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Aksi Cepat</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button asChild>
          <Link href="/admin/guru">Manajemen Guru</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/siswa">Manajemen Siswa</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/mata-pelajaran">Manajemen Mata Pelajaran</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/jadwal">Penjadwalan Kelas</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/laporan">Laporan</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/profile">Profil Admin</Link>
        </Button>
      </CardContent>
    </Card>
  </div>
)
}

