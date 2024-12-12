import { Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function AbsensiButton() {
  return (
    <Button 
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 rounded-full w-16 h-16 bg-blue-500 hover:bg-blue-600 flex items-center justify-center"
      onClick={() => {
        // Implementasi logika absensi di sini
        console.log('Absensi diklik')
      }}
    >
      <Clock size={24} color="white" />
    </Button>
  )
}

