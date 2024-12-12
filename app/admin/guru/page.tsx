'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { sampleTeachers } from '../../../lib/sampleData'
import { Pencil, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Teacher {
  id: string;
  name: string;
  nip: string;
  subjects: string[];
}

export default function ManajemenGuru() {
  const [teachers, setTeachers] = useState<Teacher[]>(sampleTeachers)
  const [newTeacher, setNewTeacher] = useState<Omit<Teacher, 'id'>>({ name: '', nip: '', subjects: [] })
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null)

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault()
    const id = (teachers.length + 1).toString()
    setTeachers([...teachers, { ...newTeacher, id }])
    setNewTeacher({ name: '', nip: '', subjects: [] })
    toast({
      title: "Guru berhasil ditambahkan",
      description: "Data guru baru telah disimpan.",
    })
  }

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id))
    toast({
      title: "Guru berhasil dihapus",
      description: "Data guru telah dihapus dari sistem.",
    })
  }

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher)
  }

  const handleUpdateTeacher = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTeacher) return

    setTeachers(teachers.map(teacher => 
      teacher.id === editingTeacher.id ? editingTeacher : teacher
    ))
    setEditingTeacher(null)
    toast({
      title: "Guru berhasil diperbarui",
      description: "Data guru telah diperbarui dalam sistem.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manajemen Guru</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Tambah Guru Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddTeacher} className="space-y-4">
            <Input
              type="text"
              placeholder="NIP"
              value={newTeacher.nip}
              onChange={(e) => setNewTeacher({...newTeacher, nip: e.target.value})}
              required
            />
            <Input
              type="text"
              placeholder="Nama"
              value={newTeacher.name}
              onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
              required
            />
            <Input
              type="text"
              placeholder="Mata Pelajaran (pisahkan dengan koma)"
              value={newTeacher.subjects.join(', ')}
              onChange={(e) => setNewTeacher({...newTeacher, subjects: e.target.value.split(', ')})}
              required
            />
            <Button type="submit">Tambah Guru</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Guru</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIP</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.nip}</TableCell>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.subjects.join(', ')}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={() => handleEditTeacher(teacher)} className="mr-2" variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={() => handleDeleteTeacher(teacher.id)} variant="ghost" size="icon">
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
        </CardContent>
      </Card>

      {editingTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Guru</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateTeacher} className="space-y-4">
                <Input
                  type="text"
                  value={editingTeacher.nip}
                  onChange={(e) => setEditingTeacher({...editingTeacher, nip: e.target.value})}
                  placeholder="NIP"
                  required
                />
                <Input
                  type="text"
                  value={editingTeacher.name}
                  onChange={(e) => setEditingTeacher({...editingTeacher, name: e.target.value})}
                  placeholder="Nama"
                  required
                />
                <Input
                  type="text"
                  value={editingTeacher.subjects.join(', ')}
                  onChange={(e) => setEditingTeacher({...editingTeacher, subjects: e.target.value.split(', ')})}
                  placeholder="Mata Pelajaran (pisahkan dengan koma)"
                  required
                />
                <div className="flex justify-end space-x-2">
                  <Button type="submit">Simpan</Button>
                  <Button onClick={() => setEditingTeacher(null)} variant="outline">Batal</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

