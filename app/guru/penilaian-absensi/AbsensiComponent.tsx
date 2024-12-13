'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { sampleStudents } from '../../../lib/sampleData'

interface AbsensiComponentProps {
  selectedSubject: string
  meetings: number[]
}

type AttendanceByMeeting = {
  [studentId: string]: {
    [meetingNumber: number]: boolean
  }
}

export function AbsensiComponent({ selectedSubject, meetings }: AbsensiComponentProps) {
  const [attendance, setAttendance] = useState<AttendanceByMeeting>({})
  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(null)

  useEffect(() => {
    const initialAttendance: AttendanceByMeeting = {}
    sampleStudents.forEach(student => {
      initialAttendance[student.id] = {}
      meetings.forEach(meeting => {
        initialAttendance[student.id][meeting] = false
      })
    })
    setAttendance(initialAttendance)
  }, [meetings])

  const handleAttendanceChange = (studentId: string, value: boolean) => {
    if (selectedMeeting === null) return
    setAttendance(prevAttendance => ({
      ...prevAttendance,
      [studentId]: {
        ...prevAttendance[studentId],
        [selectedMeeting]: value
      }
    }))
  }

  const submitAttendance = () => {
    console.log('Attendance submitted:', attendance)
    toast({
      title: "Absensi Tersimpan",
      description: `Absensi siswa untuk pertemuan ke-${selectedMeeting} telah berhasil disimpan.`,
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
                <TableHead>Hadir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={attendance[student.id]?.[selectedMeeting] || false}
                      onCheckedChange={(checked) => handleAttendanceChange(student.id, checked as boolean)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={submitAttendance}>Simpan Absensi</Button>
        </>
      )}
    </div>
  )
}

