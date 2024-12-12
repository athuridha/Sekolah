'use client'

import { useState, useEffect } from 'react'
import { sampleTeachers } from '../../lib/sampleData'

export default function AbsensiGuru() {
  const [user, setUser] = useState<{ id: string; name: string; nip: string; subjects: string[] } | null>(null)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [attendance, setAttendance] = useState<{ [nip: string]: { [date: string]: 'Hadir' | 'Izin' | 'Sakit' | 'Pulang' } }>({})

  useEffect(() => {
    const storedNIP = localStorage.getItem('guruNIP')
    if (storedNIP) {
      const teacher = sampleTeachers.find(t => t.nip === storedNIP)
      setUser(teacher || null)
    }
  }, [])

  const markAttendance = async (type: 'arrival' | 'departure') => {
    try {
      if (!user) {
        setError('Data guru tidak ditemukan.')
        return
      }

      const date = new Date().toISOString().split('T')[0]
      const attendanceStatus = type === 'arrival' ? 'Hadir' : 'Pulang'  // Masih menggunakan 'Pulang'
      const updatedAttendance = { ...attendance }

      // Pastikan object untuk nip guru ada dalam attendance
      if (!updatedAttendance[user.nip]) {
        updatedAttendance[user.nip] = {}
      }

      updatedAttendance[user.nip] = {
        ...updatedAttendance[user.nip],
        [date]: attendanceStatus,
      }

      setAttendance(updatedAttendance)
      setStatus(`Berhasil mencatat ${type === 'arrival' ? 'kedatangan' : 'kepulangan'}`)
    } catch (error: unknown) {
      // Memastikan error adalah objek dengan properti message
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Terjadi kesalahan yang tidak diketahui.')
      }
    }
  }

  const updateAttendance = (nip: string, date: string, newStatus: 'Hadir' | 'Izin' | 'Sakit') => {
    try {
      if (!attendance[nip] || !attendance[nip][date]) {
        throw new Error('Data absensi tidak ditemukan.')
      }

      const updatedAttendance = { ...attendance }
      updatedAttendance[nip][date] = newStatus // Perbarui status absensi
      setAttendance(updatedAttendance)
      setStatus(`Berhasil memperbarui absensi untuk ${nip} pada tanggal ${date} menjadi ${newStatus}`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Terjadi kesalahan yang tidak diketahui.')
      }
    }
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3 // radius bumi dalam meter
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c // dalam meter
  }

  if (!user) {
    return <div>Silakan login terlebih dahulu</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Absensi Guru</h1>
      <div className="space-y-4">
        <button
          onClick={() => markAttendance('arrival')}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Catat Kedatangan
        </button>
        <button
          onClick={() => markAttendance('departure')}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Catat Kepulangan
        </button>
        <button
          onClick={() => updateAttendance(user.nip, new Date().toISOString().split('T')[0], 'Izin')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Perbarui Absensi ke "Izin"
        </button>
      </div>
      {status && <p className="mt-4 text-green-600">{status}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  )
}
