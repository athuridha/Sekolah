import { Timestamp } from 'firebase/firestore';

export const sampleClasses = [
  'X RPL', 'X TKRO', 'X TBSM', 'X OTKP',
  'XI RPL', 'XI TKRO', 'XI TBSM', 'XI OTKP',
  'XII RPL', 'XII TKRO', 'XII TBSM', 'XII OTKP'
];

export const sampleStudents = [
  // X RPL
  { id: '1', name: 'Andi Pratama', nis: '1001', class: 'X RPL' },
  { id: '2', name: 'Budi Santoso', nis: '1002', class: 'X RPL' },
  { id: '3', name: 'Citra Dewi', nis: '1003', class: 'X RPL' },
  { id: '4', name: 'Dian Sastro', nis: '1004', class: 'X RPL' },
  { id: '5', name: 'Eko Prasetyo', nis: '1005', class: 'X RPL' },
  { id: '6', name: 'Fitri Handayani', nis: '1006', class: 'X RPL' },
  { id: '7', name: 'Gita Gutawa', nis: '1007', class: 'X RPL' },
  { id: '8', name: 'Hadi Sulistyo', nis: '1008', class: 'X RPL' },
  { id: '9', name: 'Indah Permata', nis: '1009', class: 'X RPL' },
  { id: '10', name: 'Joko Widodo', nis: '1010', class: 'X RPL' },

  // X TKRO
  { id: '11', name: 'Kartika Sari', nis: '1011', class: 'X TKRO' },
  { id: '12', name: 'Lukman Hakim', nis: '1012', class: 'X TKRO' },
  { id: '13', name: 'Mawar Melati', nis: '1013', class: 'X TKRO' },
  { id: '14', name: 'Nugroho Wijaya', nis: '1014', class: 'X TKRO' },
  { id: '15', name: 'Olivia Putri', nis: '1015', class: 'X TKRO' },
  { id: '16', name: 'Pandu Pratama', nis: '1016', class: 'X TKRO' },
  { id: '17', name: 'Qori Amalia', nis: '1017', class: 'X TKRO' },
  { id: '18', name: 'Rudi Hartono', nis: '1018', class: 'X TKRO' },
  { id: '19', name: 'Siti Nurhaliza', nis: '1019', class: 'X TKRO' },
  { id: '20', name: 'Tono Sudirjo', nis: '1020', class: 'X TKRO' },

  // X TBSM
  { id: '21', name: 'Udin Sedunia', nis: '1021', class: 'X TBSM' },
  { id: '22', name: 'Vina Panduwinata', nis: '1022', class: 'X TBSM' },
  { id: '23', name: 'Wati Sulistyowati', nis: '1023', class: 'X TBSM' },
  { id: '24', name: 'Xaverius Cristian', nis: '1024', class: 'X TBSM' },
  { id: '25', name: 'Yanto Mulyono', nis: '1025', class: 'X TBSM' },
  { id: '26', name: 'Zainal Abidin', nis: '1026', class: 'X TBSM' },
  { id: '27', name: 'Ayu Ting Ting', nis: '1027', class: 'X TBSM' },
  { id: '28', name: 'Bambang Pamungkas', nis: '1028', class: 'X TBSM' },
  { id: '29', name: 'Cahya Kamila', nis: '1029', class: 'X TBSM' },
  { id: '30', name: 'Dedi Corbuzier', nis: '1030', class: 'X TBSM' },

  // X OTKP
  { id: '31', name: 'Erni Sari', nis: '1031', class: 'X OTKP' },
  { id: '32', name: 'Fandi Ahmad', nis: '1032', class: 'X OTKP' },
  { id: '33', name: 'Gita Gutawa', nis: '1033', class: 'X OTKP' },
  { id: '34', name: 'Hengky Kurniawan', nis: '1034', class: 'X OTKP' },
  { id: '35', name: 'Inul Daratista', nis: '1035', class: 'X OTKP' },
  { id: '36', name: 'Jaja Miharja', nis: '1036', class: 'X OTKP' },
  { id: '37', name: 'Krisdayanti', nis: '1037', class: 'X OTKP' },
  { id: '38', name: 'Luna Maya', nis: '1038', class: 'X OTKP' },
  { id: '39', name: 'Melly Goeslaw', nis: '1039', class: 'X OTKP' },
  { id: '40', name: 'Nidji Band', nis: '1040', class: 'X OTKP' },
];

export const sampleSubjects = [
  { id: '1', name: 'Matematika' },
  { id: '2', name: 'Bahasa Indonesia' },
  { id: '3', name: 'Bahasa Inggris' },
  { id: '4', name: 'Pemrograman Dasar' },
  { id: '5', name: 'Basis Data' },
  { id: '6', name: 'Pemrograman Web' },
  { id: '7', name: 'Teknik Otomotif Dasar' },
  { id: '8', name: 'Pemeliharaan Mesin Sepeda Motor' },
  { id: '9', name: 'Administrasi Umum' },
  { id: '10', name: 'Kearsipan' },
];

export const sampleTeachers = [
  { id: '1', name: 'Agus Setiawan', nip: '2001', subjects: ['Matematika', 'Pemrograman Dasar'] },
  { id: '2', name: 'Budi Hartono', nip: '2002', subjects: ['Bahasa Indonesia', 'Bahasa Inggris'] },
  { id: '3', name: 'Citra Lestari', nip: '2003', subjects: ['Basis Data', 'Pemrograman Web'] },
  { id: '4', name: 'Dewi Safitri', nip: '2004', subjects: ['Teknik Otomotif Dasar', 'Pemeliharaan Mesin Sepeda Motor'] },
  { id: '5', name: 'Eko Prasetyo', nip: '2005', subjects: ['Administrasi Umum', 'Kearsipan'] },
  { id: '6', name: 'Fajar Sidik', nip: '2006', subjects: ['Matematika', 'Fisika'] },
  { id: '7', name: 'Gita Savitri', nip: '2007', subjects: ['Kimia', 'Biologi'] },
  { id: '8', name: 'Hendra Wijaya', nip: '2008', subjects: ['Sejarah', 'Geografi'] },
  { id: '9', name: 'Indah Permatasari', nip: '2009', subjects: ['Ekonomi', 'Sosiologi'] },
  { id: '10', name: 'Joko Anwar', nip: '2010', subjects: ['Seni Budaya', 'Prakarya'] },
  { id: '11', name: 'Kartika Putri', nip: '2011', subjects: ['Pendidikan Jasmani', 'Kesehatan'] },
  { id: '12', name: 'Lukman Hakim', nip: '2012', subjects: ['Pendidikan Agama', 'Pendidikan Kewarganegaraan'] },
  { id: '13', name: 'Mawar Melati', nip: '2013', subjects: ['Bahasa Jawa', 'Bahasa Sunda'] },
  { id: '14', name: 'Nugroho Wicaksono', nip: '2014', subjects: ['Teknik Komputer Jaringan', 'Sistem Operasi'] },
  { id: '15', name: 'Olivia Zalianty', nip: '2015', subjects: ['Kewirausahaan', 'Manajemen Bisnis'] },
];

export const sampleSchedules = [
  {
    id: '1',
    tanggal: Timestamp.fromDate(new Date(2023, 5, 1, 8, 0)),
    waktuMulai: '08:00',
    waktuSelesai: '09:30',
    mataPelajaran: 'Matematika',
    kelas: 'X RPL',
    guruNIP: '2001'
  },
  {
    id: '2',
    tanggal: Timestamp.fromDate(new Date(2023, 5, 1, 10, 0)),
    waktuMulai: '10:00',
    waktuSelesai: '11:30',
    mataPelajaran: 'Bahasa Indonesia',
    kelas: 'X TKRO',
    guruNIP: '2002'
  },
  {
    id: '3',
    tanggal: Timestamp.fromDate(new Date(2023, 5, 2, 8, 0)),
    waktuMulai: '08:00',
    waktuSelesai: '09:30',
    mataPelajaran: 'Pemrograman Dasar',
    kelas: 'XI RPL',
    guruNIP: '2001'
  },
  {
    id: '4',
    tanggal: Timestamp.fromDate(new Date(2023, 5, 2, 10, 0)),
    waktuMulai: '10:00',
    waktuSelesai: '11:30',
    mataPelajaran: 'Teknik Otomotif Dasar',
    kelas: 'XI TKRO',
    guruNIP: '2004'
  },
];

export const sampleGrades = Object.fromEntries(
  sampleStudents.map(student => [
    student.nis,
    Object.fromEntries(
      sampleSubjects.map(subject => [
        subject.id,
        Math.floor(Math.random() * 31) + 70 // Random grade between 70 and 100
      ])
    )
  ])
);

export const sampleAttendance = Object.fromEntries(
  sampleStudents.map(student => [
    student.nis,
    Object.fromEntries(
      Array.from({ length: 5 }, (_, i) => {
        const date = new Date(2023, 5, i + 1);
        const status = Math.random() < 0.9 ? 'Hadir' : (Math.random() < 0.5 ? 'Izin' : 'Sakit');
        return [date.toISOString().split('T')[0], status];
      })
    )
  ])
);

