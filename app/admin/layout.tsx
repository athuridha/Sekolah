'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, FileText, LogOut } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAdminStatus = () => {
      const adminUsername = localStorage.getItem('adminUsername')
      if (adminUsername === 'admin') {
        setIsAdmin(true)
      } else {
        router.push('/')
      }
    }
    checkAdminStatus()
  }, [router])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminUsername')
    router.push('/')
  }, [router])

  const toggleMobileMenu = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setShowOverlay(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
    setShowOverlay(false)
  }

  useEffect(() => {
    if (isSidebarOpen) {
      closeSidebar()
    }
  }, [pathname])

  if (!isAdmin) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button onClick={toggleMobileMenu} className="text-gray-500 hover:text-gray-700">
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`bg-white shadow-md w-64 fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <nav className="mt-5 px-4">
          <Link href="/admin" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/admin/guru" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
            <Users className="mr-3 h-5 w-5" />
            Manajemen Guru
          </Link>
          <Link href="/admin/siswa" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
            <GraduationCap className="mr-3 h-5 w-5" />
            Manajemen Siswa
          </Link>
          <Link href="/admin/mata-pelajaran" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
            <BookOpen className="mr-3 h-5 w-5" />
            Manajemen Mata Pelajaran
          </Link>
          <Link href="/admin/jadwal" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
            <Calendar className="mr-3 h-5 w-5" />
            Penjadwalan Kelas
          </Link>
          <Link href="/admin/laporan" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
            <FileText className="mr-3 h-5 w-5" />
            Laporan Nilai dan Absensi
          </Link>
          <button onClick={handleLogout} className="flex items-center w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Overlay */}
      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden flex flex-col">
        <main className="flex-1 p-4 md:p-10">
          {children}
        </main>
      </div>
    </div>
  )
}

