import Link from 'next/link'
import { Home, BookOpen, Map, User, LogOut, Calendar, ClipboardList } from 'lucide-react'

export function BottomNav({ onLogout }: { onLogout: () => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="flex justify-around items-center">
        <Link href="/guru" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <Home size={24} />
          <span className="text-xs mt-1"></span>
        </Link>
        <Link href="/guru/jadwal" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <Calendar size={24} />
          <span className="text-xs mt-1"></span>
        </Link>
        <Link href="/guru/absensi" className="flex flex-col items-center justify-center">
          <div className="bg-blue-500 rounded-full p-3 -mt-8">
            <Map size={24} color="white" />
          </div>
        </Link>
        <Link href="/guru/penilaian-absensi" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <ClipboardList size={24} />
          <span className="text-xs mt-1"></span>
        </Link>
        <button onClick={onLogout} className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <LogOut size={24} />
          <span className="text-xs mt-1"></span>
        </button>
      </div>
    </nav>
  )
}

