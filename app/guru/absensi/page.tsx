'use client' // <-- Mark this file as a Client Component

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, CheckCircle, XCircle } from 'lucide-react'
import { toast } from "@/hooks/use-toast"
import { sampleTeachers } from '../../../lib/sampleData'

export default function AbsensiGuru() {
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [isLate, setIsLate] = useState(false)
  const [lateReason, setLateReason] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [teacher, setTeacher] = useState(sampleTeachers[0]) // Default to first teacher

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    checkAttendanceStatus()
    return () => clearInterval(timer)
  }, [])

  const checkAttendanceStatus = () => {
    const now = new Date()
    if (now.getHours() < 8 || (now.getHours() === 8 && now.getMinutes() === 0)) {
      setIsLate(false)
    } else {
      setIsLate(true)
    }
  }

  const markAttendance = async () => {
    try {
      const attendanceData = {
        teacherId: teacher.id,
        timestamp: new Date().toISOString(),
        isLate: isLate,
        lateReason: isLate ? lateReason : null,
      }
      console.log('Attendance marked:', attendanceData)
      setStatus('Absensi berhasil dicatat')
      toast({
        title: "Absensi Berhasil",
        description: "Kehadiran Anda telah dicatat.",
      })
    } catch (error) {
      setError('Terjadi kesalahan saat mencatat absensi')
      toast({
        title: "Gagal Mencatat Absensi",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      <h1 className="text-3xl font-bold">Absensi Guru</h1>

      <Card className="bg-gradient-to-r from-blue-500 to-blue-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="mr-2" /> Waktu Saat Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-white">{currentTime.toLocaleTimeString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            Absensi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status ? (
            <div className="text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              <p className="mt-2 text-lg font-semibold text-green-600">{status}</p>
            </div>
          ) : (
            <>
              {isLate && (
                <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
                  <p className="text-yellow-700">Anda terlambat. Silakan berikan alasan keterlambatan.</p>
                  <div className="mt-2">
                    <Label htmlFor="lateReason">Alasan Keterlambatan</Label>
                    <Input
                      id="lateReason"
                      value={lateReason}
                      onChange={(e) => setLateReason(e.target.value)}
                      placeholder="Masukkan alasan keterlambatan"
                      required
                    />
                  </div>
                </div>
              )}
              <Button onClick={markAttendance} className="w-full" disabled={isLate && !lateReason}>
                Catat Kehadiran
              </Button>
            </>
          )}
          {error && (
            <div className="mt-4 p-4 bg-red-100 rounded-lg">
              <XCircle className="mx-auto h-8 w-8 text-red-500" />
              <p className="mt-2 text-center text-red-700">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
