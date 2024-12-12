'use client'

import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sampleSchedules, sampleTeachers } from '../../../lib/sampleData'

const localizer = momentLocalizer(moment)

interface ScheduleEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export default function JadwalGuru() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])
  const [guruNIP, setGuruNIP] = useState('2001') // Hardcoded for demo purposes

  useEffect(() => {
    const teacher = sampleTeachers.find(t => t.nip === guruNIP)
    if (teacher) {
      const teacherEvents = sampleSchedules
        .filter(schedule => schedule.guruNIP === guruNIP)
        .map(schedule => ({
          id: schedule.id,
          title: `${schedule.mataPelajaran} - ${schedule.kelas}`,
          start: schedule.tanggal.toDate(),
          end: new Date(schedule.tanggal.toDate().getTime() + 90 * 60000), // Assuming 90 minutes duration
        }))
      setEvents(teacherEvents)
    }
  }, [guruNIP])

  return (
    <div className="space-y-6 p-6 pb-16">
      <h1 className="text-3xl font-bold">Jadwal Mengajar</h1>
      
      <Card className="bg-gradient-to-r from-purple-500 to-purple-600">
        <CardHeader>
          <CardTitle className="text-white">Kalender Jadwal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-lg p-4" style={{ height: '500px' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

