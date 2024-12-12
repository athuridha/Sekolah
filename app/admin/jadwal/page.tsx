'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { sampleSchedules, sampleClasses, sampleSubjects, sampleTeachers } from '../../../lib/sampleData'
import { Timestamp } from 'firebase/firestore'
import { Pencil, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Schedule {
  id: string;
  tanggal: Timestamp;
  waktuMulai: string;
  waktuSelesai: string;
  mataPelajaran: string;
  kelas: string;
  guruNIP: string;
}

export default function PenjadwalanKelas() {
  const [jadwal, setJadwal] = useState<Schedule[]>(sampleSchedules)
  const [newJadwal, setNewJadwal] = useState<Omit<Schedule, 'id'>>({ 
    tanggal: Timestamp.now(), 
    waktuMulai: '', 
    waktuSelesai: '', 
    mataPelajaran: '', 
    kelas: '', 
    guruNIP: '' 
  })
  const [editingJadwal, setEditingJadwal] = useState<Schedule | null>(null)
  const [filterKelas, setFilterKelas] = useState<string>('')

  const handleAddJadwal = (e: React.FormEvent) => {
    e.preventDefault()
    const newId = (jadwal.length + 1).toString()
    const newSchedule = {
      ...newJadwal,
      id: newId,
    }
    setJadwal([...jadwal, newSchedule])
    setNewJadwal({ tanggal: Timestamp.now(), waktuMulai: '', waktuSelesai: '', mataPelajaran: '', kelas: '', guruNIP: '' })
    toast({
      title: "Jadwal berhasil ditambahkan",
      description: "Jadwal baru telah ditambahkan ke dalam sistem.",
    })
  }

  const handleDeleteJadwal = (id: string) => {
    setJadwal(jadwal.filter(j => j.id !== id))
    toast({
      title: "Jadwal berhasil dihapus",
      description: "Jadwal telah dihapus dari sistem.",
    })
  }

  const handleEditJadwal = (jadwal: Schedule) => {
    setEditingJadwal(jadwal)
  }

  const handleUpdateJadwal = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingJadwal) {
      setJadwal(jadwal.map(j => j.id === editingJadwal.id ? editingJadwal : j))
      setEditingJadwal(null)
      toast({
        title: "Jadwal berhasil diperbarui",
        description: "Perubahan jadwal telah disimpan.",
      })
    }
  }

  const filteredJadwal = filterKelas === 'all'
    ? jadwal
    : jadwal.filter(j => j.kelas === filterKelas)

  return (
    <div className="space-y-6 p-6 pb-16">
      <h1 className="text-3xl font-bold">Penjadwalan Kelas</h1>
      
      <Card className="bg-gradient-to-r from-green-500 to-green-600">
        <CardHeader>
          <CardTitle className="text-white">Tambah Jadwal Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddJadwal} className="space-y-4 bg-white p-4 rounded-lg">
            <Input
              type="date"
              value={newJadwal.tanggal.toDate().toISOString().split('T')[0]}
              onChange={(e) => setNewJadwal({...newJadwal, tanggal: Timestamp.fromDate(new Date(e.target.value))})}
              required
            />
            <div className="flex space-x-2">
              <Input
                type="time"
                value={newJadwal.waktuMulai}
                onChange={(e) => setNewJadwal({...newJadwal, waktuMulai: e.target.value})}
                required
              />
              <Input
                type="time"
                value={newJadwal.waktuSelesai}
                onChange={(e) => setNewJadwal({...newJadwal, waktuSelesai: e.target.value})}
                required
              />
            </div>
            <Select onValueChange={(value) => setNewJadwal({...newJadwal, mataPelajaran: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent>
                {sampleSubjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setNewJadwal({...newJadwal, kelas: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                {sampleClasses.map((className) => (
                  <SelectItem key={className} value={className}>{className}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setNewJadwal({...newJadwal, guruNIP: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Guru" />
              </SelectTrigger>
              <SelectContent>
                {sampleTeachers.map((teacher) => (
                  <SelectItem key={teacher.nip} value={teacher.nip}>{teacher.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full">Tambah Jadwal</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Jadwal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select onValueChange={setFilterKelas}>
              <SelectTrigger>
                <SelectValue placeholder="Filter berdasarkan kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                {sampleClasses.map((className) => (
                  <SelectItem key={className} value={className}>{className}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-100">Tanggal</TableHead>
                  <TableHead className="bg-gray-100">Waktu</TableHead>
                  <TableHead className="bg-gray-100">Mata Pelajaran</TableHead>
                  <TableHead className="bg-gray-100">Kelas</TableHead>
                  <TableHead className="bg-gray-100">Guru</TableHead>
                  <TableHead className="bg-gray-100">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJadwal.map((j) => (
                  <TableRow key={j.id} className="hover:bg-gray-50">
                    <TableCell>{j.tanggal.toDate().toLocaleDateString()}</TableCell>
                    <TableCell>{`${j.waktuMulai} - ${j.waktuSelesai}`}</TableCell>
                    <TableCell>{j.mataPelajaran}</TableCell>
                    <TableCell>{j.kelas}</TableCell>
                    <TableCell>{sampleTeachers.find(t => t.nip === j.guruNIP)?.name}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={() => handleEditJadwal(j)} className="mr-2" variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button onClick={() => handleDeleteJadwal(j.id)} variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Hapus</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {editingJadwal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Jadwal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateJadwal} className="space-y-4">
                <Input
                  type="date"
                  value={editingJadwal.tanggal.toDate().toISOString().split('T')[0]}
                  onChange={(e) => setEditingJadwal({...editingJadwal, tanggal: Timestamp.fromDate(new Date(e.target.value))})}
                  required
                />
                <div className="flex space-x-2">
                  <Input
                    type="time"
                    value={editingJadwal.waktuMulai}
                    onChange={(e) => setEditingJadwal({...editingJadwal, waktuMulai: e.target.value})}
                    required
                  />
                  <Input
                    type="time"
                    value={editingJadwal.waktuSelesai}
                    onChange={(e) => setEditingJadwal({...editingJadwal, waktuSelesai: e.target.value})}
                    required
                  />
                </div>
                <Select 
                  value={editingJadwal.mataPelajaran}
                  onValueChange={(value) => setEditingJadwal({...editingJadwal, mataPelajaran: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Mata Pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleSubjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  value={editingJadwal.kelas}
                  onValueChange={(value) => setEditingJadwal({...editingJadwal, kelas: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleClasses.map((className) => (
                      <SelectItem key={className} value={className}>{className}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  value={editingJadwal.guruNIP}
                  onValueChange={(value) => setEditingJadwal({...editingJadwal, guruNIP: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Guru" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleTeachers.map((teacher) => (
                      <SelectItem key={teacher.nip} value={teacher.nip}>{teacher.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex justify-end space-x-2">
                  <Button type="submit">Simpan</Button>
                  <Button onClick={() => setEditingJadwal(null)} variant="outline">Batal</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

