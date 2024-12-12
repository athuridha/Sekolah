'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sampleStudents, sampleClasses } from '../../../lib/sampleData'

interface Student {
  id: string;
  name: string;
  nis: string;
  class: string;
}

export default function ManajemenSiswa() {
  const [students, setStudents] = useState<Student[]>(sampleStudents)
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id'>>({ name: '', nis: '', class: '' })
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage] = useState(10)

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault()
    const id = (students.length + 1).toString()
    setStudents([...students, { ...newStudent, id }])
    setNewStudent({ name: '', nis: '', class: '' })
    toast({
      title: "Siswa berhasil ditambahkan",
      description: "Data siswa baru telah disimpan.",
    })
  }

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id))
    toast({
      title: "Siswa berhasil dihapus",
      description: "Data siswa telah dihapus dari sistem.",
    })
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
  }

  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingStudent) return

    setStudents(students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    ))
    setEditingStudent(null)
    toast({
      title: "Siswa berhasil diperbarui",
      description: "Data siswa telah diperbarui dalam sistem.",
    })
  }

  const filteredStudents = selectedClass === "all" 
    ? students 
    : students.filter(student => student.class === selectedClass)

  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manajemen Siswa</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Tambah Siswa Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <Input
              type="text"
              placeholder="NIS"
              value={newStudent.nis}
              onChange={(e) => setNewStudent({...newStudent, nis: e.target.value})}
              required
            />
            <Input
              type="text"
              placeholder="Nama"
              value={newStudent.name}
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              required
            />
            <Select 
              value={newStudent.class} 
              onValueChange={(value) => setNewStudent({...newStudent, class: value})}
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
            <Button type="submit">Tambah Siswa</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedClass} onValueChange={(value) => { setSelectedClass(value); setCurrentPage(1); }}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                {sampleClasses.map((className) => (
                  <SelectItem key={className} value={className}>{className}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIS</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.nis}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={() => handleEditStudent(student)} className="mr-2" variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button onClick={() => handleDeleteStudent(student.id)} variant="ghost" size="icon">
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
          <div className="flex items-center justify-between space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Siswa</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateStudent} className="space-y-4">
                <Input
                  type="text"
                  value={editingStudent.nis}
                  onChange={(e) => setEditingStudent({...editingStudent, nis: e.target.value})}
                  placeholder="NIS"
                  required
                />
                <Input
                  type="text"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                  placeholder="Nama"
                  required
                />
                <Select 
                  value={editingStudent.class} 
                  onValueChange={(value) => setEditingStudent({...editingStudent, class: value})}
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
                <div className="flex justify-end space-x-2">
                  <Button type="submit">Simpan</Button>
                  <Button onClick={() => setEditingStudent(null)} variant="outline">Batal</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

