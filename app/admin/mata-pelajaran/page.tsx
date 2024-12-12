'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"
import { sampleSubjects } from '../../../lib/sampleData'

interface Subject {
  id: string;
  name: string;
}

export default function ManajemenMataPelajaran() {
  const [subjects, setSubjects] = useState<Subject[]>(sampleSubjects)
  const [newSubject, setNewSubject] = useState<Omit<Subject, 'id'>>({ name: '' })
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault()
    const id = (subjects.length + 1).toString()
    setSubjects([...subjects, { ...newSubject, id }])
    setNewSubject({ name: '' })
    toast({
      title: "Mata pelajaran berhasil ditambahkan",
      description: "Data mata pelajaran baru telah disimpan.",
    })
  }

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id))
    toast({
      title: "Mata pelajaran berhasil dihapus",
      description: "Data mata pelajaran telah dihapus dari sistem.",
    })
  }

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject)
  }

  const handleUpdateSubject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingSubject) return

    setSubjects(subjects.map(subject => 
      subject.id === editingSubject.id ? editingSubject : subject
    ))
    setEditingSubject(null)
    toast({
      title: "Mata pelajaran berhasil diperbarui",
      description: "Data mata pelajaran telah diperbarui dalam sistem.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manajemen Mata Pelajaran</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Tambah Mata Pelajaran Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddSubject} className="space-y-4">
            <Input
              type="text"
              placeholder="Nama Mata Pelajaran"
              value={newSubject.name}
              onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
              required
            />
            <Button type="submit">Tambah Mata Pelajaran</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Mata Pelajaran</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Mata Pelajaran</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.id}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={() => handleEditSubject(subject)} className="mr-2" variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={() => handleDeleteSubject(subject.id)} variant="ghost" size="icon">
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

      {editingSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Mata Pelajaran</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateSubject} className="space-y-4">
                <Input
                  type="text"
                  value={editingSubject.name}
                  onChange={(e) => setEditingSubject({...editingSubject, name: e.target.value})}
                  placeholder="Nama Mata Pelajaran"
                  required
                />
                <div className="flex justify-end space-x-2">
                  <Button type="submit">Simpan</Button>
                  <Button onClick={() => setEditingSubject(null)} variant="outline">Batal</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

