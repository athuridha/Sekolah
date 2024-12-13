import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sampleSubjects } from '../../../lib/sampleData'

interface MeetingManagerProps {
  selectedSubject: string
  setSelectedSubject: (subject: string) => void
  meetings: number[]
  addMeeting: () => void
}

export function MeetingManager({ selectedSubject, setSelectedSubject, meetings, addMeeting }: MeetingManagerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pilih Mata Pelajaran dan Kelola Pertemuan</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <Select onValueChange={setSelectedSubject} value={selectedSubject}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Pilih Mata Pelajaran" />
          </SelectTrigger>
          <SelectContent>
            {sampleSubjects.map(subject => (
              <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedSubject && (
          <>
            <div>
              <p>Pertemuan yang tersedia: {meetings.join(', ')}</p>
            </div>
            <Button onClick={addMeeting}>Tambah Pertemuan</Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

