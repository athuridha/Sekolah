'use client' // <-- Mark this file as a Client Component

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { sampleStudents, sampleSubjects, sampleGrades } from '../../../lib/sampleData'

// New type for grades based on meetings
type GradesByMeeting = {
  [studentId: string]: {
    [subjectId: string]: {
      [meetingNumber: number]: number
    }
  }
}

// New type for attendance, where the key is the studentId and the value is boolean
type Attendance = {
  [studentId: string]: boolean
}

export default function PenilaianAbsensiSiswa() {
  const [selectedSubject, setSelectedSubject] = useState<string>('') // subject selected by the user
  const [grades, setGrades] = useState<GradesByMeeting>({}) // stores grades
  const [attendance, setAttendance] = useState<Attendance>({}) // stores attendance
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]) // initial date (today)
  const [meetingNumber, setMeetingNumber] = useState<number>(1) // initial meeting number

  useEffect(() => {
    // Initialize grades and attendance for the current meeting
    const initialGrades: GradesByMeeting = {}
    const initialAttendance: Attendance = {}
    sampleStudents.forEach(student => {
      if (!initialGrades[student.id]) {
        initialGrades[student.id] = {}
      }
      if (!initialGrades[student.id][selectedSubject]) {
        initialGrades[student.id][selectedSubject] = {}
      }
      initialGrades[student.id][selectedSubject][meetingNumber] = 0
      initialAttendance[student.id] = true // Default attendance status is true (present)
    })
    setGrades(initialGrades)
    setAttendance(initialAttendance)
  }, [selectedSubject, meetingNumber])

  const handleGradeChange = (studentId: string, value: string) => {
    setGrades(prevGrades => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [selectedSubject]: {
          ...prevGrades[studentId]?.[selectedSubject],
          [meetingNumber]: Number(value)
        }
      }
    }))
  }

  const handleAttendanceChange = (studentId: string, value: boolean) => {
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [studentId]: value
    }))
  }

  const submitData = () => {
    console.log('Grades submitted:', grades)
    console.log('Attendance submitted:', attendance)
    toast({
      title: "Data Tersimpan",
      description: `Nilai dan absensi siswa untuk pertemuan ke-${meetingNumber} telah berhasil disimpan.`,
    })
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      <h1 className="text-3xl font-bold">Penilaian dan Absensi Siswa</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Pilih Mata Pelajaran, Tanggal, dan Pertemuan</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Select onValueChange={setSelectedSubject} value={selectedSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Mata Pelajaran" />
            </SelectTrigger>
            <SelectContent>
              {sampleSubjects.map(subject => (
                <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-[180px]"
          />
          <Select 
            onValueChange={(value) => setMeetingNumber(Number(value))} 
            value={meetingNumber.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Pertemuan" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(num => (
                <SelectItem key={num} value={num.toString()}>Pertemuan {num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedSubject && (
        <Card>
          <CardHeader>
            <CardTitle>Daftar Siswa - Pertemuan {meetingNumber}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead>Hadir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleStudents.map(student => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={grades[student.id]?.[selectedSubject]?.[meetingNumber] || ''}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={attendance[student.id]}
                        onCheckedChange={(checked) => handleAttendanceChange(student.id, checked as boolean)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={submitData} className="mt-4">Simpan Data</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
