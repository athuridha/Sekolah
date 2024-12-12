'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { sampleStudents, sampleTeachers, sampleGrades, sampleAttendance, sampleSubjects, sampleClasses } from '../../../lib/sampleData'

const ITEMS_PER_PAGE = 10

export default function Laporan() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [studentPage, setStudentPage] = useState(1)
  const [teacherPage, setTeacherPage] = useState(1)

  const filteredStudents = selectedClass
    ? sampleStudents.filter(student => student.class === selectedClass)
    : sampleStudents

  const studentPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)
  const teacherPages = Math.ceil(sampleTeachers.length / ITEMS_PER_PAGE)

  const paginatedStudents = filteredStudents.slice(
    (studentPage - 1) * ITEMS_PER_PAGE,
    studentPage * ITEMS_PER_PAGE
  )

  const paginatedTeachers = sampleTeachers.slice(
    (teacherPage - 1) * ITEMS_PER_PAGE,
    teacherPage * ITEMS_PER_PAGE
  )

  const getStudentGrades = (nis: string) => {
    const grades = sampleGrades[nis]
    return grades ? Object.entries(grades).map(([subjectId, grade]) => ({
      subject: sampleSubjects.find(s => s.id === subjectId)?.name || 'Unknown',
      grade
    })) : []
  }

  const getStudentAttendance = (nis: string) => {
    return sampleAttendance[nis] || {}
  }

  useEffect(() => {
    setSelectedStudent(null)
    setStudentPage(1)
  }, [selectedClass])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Laporan</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Siswa: {sampleStudents.length}</p>
          <p>Total Guru: {sampleTeachers.length}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Laporan Nilai dan Absensi Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <Select onValueChange={(value) => setSelectedClass(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                {sampleClasses.map((className) => (
                  <SelectItem key={className} value={className}>{className}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedStudent(value)} value={selectedStudent || undefined}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Pilih Siswa" />
              </SelectTrigger>
              <SelectContent>
                {filteredStudents.map((student) => (
                  <SelectItem key={student.nis} value={student.nis}>{student.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedStudent && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Nilai</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mata Pelajaran</TableHead>
                    <TableHead>Nilai</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getStudentGrades(selectedStudent).map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell>{grade.subject}</TableCell>
                      <TableCell>{grade.grade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <h3 className="text-lg font-semibold mt-4">Absensi</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(getStudentAttendance(selectedStudent)).map(([date, status]) => (
                    <TableRow key={date}>
                      <TableCell>{date}</TableCell>
                      <TableCell>{status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NIS</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Kelas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.nis}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.class}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setStudentPage(p => Math.max(1, p - 1))}
              disabled={studentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <span>Page {studentPage} of {studentPages}</span>
            <Button
              onClick={() => setStudentPage(p => Math.min(studentPages, p + 1))}
              disabled={studentPage === studentPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTeachers.map((g) => (
                <TableRow key={g.id}>
                  <TableCell>{g.nip}</TableCell>
                  <TableCell>{g.name}</TableCell>
                  <TableCell>{g.subjects.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setTeacherPage(p => Math.max(1, p - 1))}
              disabled={teacherPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
            <span>Page {teacherPage} of {teacherPages}</span>
            <Button
              onClick={() => setTeacherPage(p => Math.min(teacherPages, p + 1))}
              disabled={teacherPage === teacherPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

