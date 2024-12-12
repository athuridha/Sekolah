'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { sampleClasses, sampleStudents, sampleSubjects, sampleGrades } from '../../../lib/sampleData'

interface Student {
  id: string;
  name: string;
  nis: string;
  class: string;
}

interface Subject {
  id: string;
  name: string;
}

interface Grade {
  [subjectId: string]: number;
}

export default function PenilaianSiswa() {
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [students, setStudents] = useState<Student[]>([])
  const [grades, setGrades] = useState<{[studentId: string]: Grade}>({})

  useEffect(() => {
    if (selectedClass) {
      const filteredStudents = sampleStudents.filter(student => student.class === selectedClass)
      setStudents(filteredStudents)
      
      const filteredGrades: {[studentId: string]: Grade} = {}
      filteredStudents.forEach(student => {
        filteredGrades[student.id] = sampleGrades[student.id] || {}
      })
      setGrades(filteredGrades)
    }
  }, [selectedClass])

  const handleGradeChange = (studentId: string, subjectId: string, value: string) => {
    const numericValue = value === '' ? 0 : Number(value)
    setGrades(prevGrades => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [subjectId]: numericValue
      }
    }))
  }

  const submitGrades = async () => {
    // In a real application, this would send the data to the server
    console.log('Grades submitted:', grades)
    toast({
      title: "Nilai berhasil disimpan",
      description: "Semua nilai siswa telah diperbarui.",
    })
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      <h1 className="text-3xl font-bold">Penilaian Siswa</h1>
      
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600">
        <CardHeader>
          <CardTitle className="text-white">Pilih Kelas</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Pilih kelas" />
            </SelectTrigger>
            <SelectContent>
              {sampleClasses.map((className) => (
                <SelectItem key={className} value={className}>{className}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedClass && (
        <Card>
          <CardHeader>
            <CardTitle>Daftar Siswa - Kelas {selectedClass}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-gray-100">NIS</TableHead>
                    <TableHead className="bg-gray-100">Nama Siswa</TableHead>
                    {sampleSubjects.map(subject => (
                      <TableHead key={subject.id} className="bg-gray-100">{subject.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(student => (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell>{student.nis}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      {sampleSubjects.map(subject => (
                        <TableCell key={subject.id}>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={grades[student.id]?.[subject.id] || ''}
                            onChange={(e) => handleGradeChange(student.id, subject.id, e.target.value)}
                            className="w-16"
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button onClick={submitGrades} className="mt-4 bg-green-500 hover:bg-green-600">Simpan Nilai</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

