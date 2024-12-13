'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenilaianComponent } from './PenilaianComponent'
import { AbsensiComponent } from './AbsensiComponent'
import { MeetingManager } from './MeetingManager'

export default function PenilaianAbsensiSiswa() {
  const [selectedSubject, setSelectedSubject] = useState('')
  const [meetings, setMeetings] = useState<number[]>([])

  const addMeeting = () => {
    if (meetings.length === 0) {
      setMeetings([1])
    } else {
      const lastMeeting = meetings[meetings.length - 1]
      setMeetings([...meetings, lastMeeting + 1])
    }
  }

  return (
    <div className="space-y-6 p-6 pb-16">
      <h1 className="text-3xl font-bold">Penilaian dan Absensi Siswa</h1>
      
      <MeetingManager 
        selectedSubject={selectedSubject} 
        setSelectedSubject={setSelectedSubject}
        meetings={meetings}
        addMeeting={addMeeting}
      />

      {selectedSubject && meetings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Data Siswa - {selectedSubject}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="penilaian">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="penilaian">Penilaian</TabsTrigger>
                <TabsTrigger value="absensi">Absensi</TabsTrigger>
              </TabsList>
              <TabsContent value="penilaian">
                <PenilaianComponent 
                  selectedSubject={selectedSubject}
                  meetings={meetings}
                />
              </TabsContent>
              <TabsContent value="absensi">
                <AbsensiComponent 
                  selectedSubject={selectedSubject}
                  meetings={meetings}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

