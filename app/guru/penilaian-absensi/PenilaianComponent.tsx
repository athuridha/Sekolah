'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { sampleStudents } from '../../../lib/sampleData'

interface PenilaianComponentProps {
  selectedSubject: string
  meetings: number[]
}

type GradesByMeeting = {
  [studentId: string]: {
    [meetingNumber: number]: number
  }
}

export function PenilaianComponent({ selectedSubject, meetings }: PenilaianComponentProps) {
  const [grades, setGrades] = useState<GradesByMeeting>({})
  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(null)

  useEffect(() => {
    const initialGrades: GradesByMeeting = {}
    sampleStudents.forEach(student => {
      initialGrades[student.id] = {}
      meetings.forEach(meeting => {
        initialGrades[student.id][meeting] = 0
      })
    })
    setGrades(initialGrades)
  }, [meetings])

  const handleGradeChange = (studentId: string, value: string) => {
    if (selectedMeeting === null) return
    setGrades(prevGrades => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [selectedMeeting]: Number(value)
      }
    }))
  }

  const submitGrades = () => {
    console.log('Grades submitted:', grades)
    toast({
      title: "Nilai Tersimpan",
      description: `Nilai siswa untuk pertemuan ke-${selectedMeeting} telah berhasil disimpan.`,
    })
  }

  return (
    <div className="space-y-4">
      <Select onValueChange={(value) => setSelectedMeeting(Number(value))}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Pilih Pertemuan" />
        </SelectTrigger>
        <SelectContent>
          {meetings.map((meeting) => (
            <SelectItem key={meeting} value={meeting.toString()}>Pertemuan {meeting}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedMeeting !== null && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Nilai</TableHead>
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
                      value={grades[student.id]?.[selectedMeeting] || ''}
                      onChange={(e) => handleGradeChange(student.id, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={submitGrades}>Simpan Nilai</Button>
        </>
      )}
    </div>
  )
}

