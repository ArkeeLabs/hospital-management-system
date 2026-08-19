export type PatientTag = 'Regular' | 'New' | 'Follow-up' | 'VIP';
export type AppointmentStatus = 'Scheduled' | 'Checked-In' | 'Completed' | 'Cancelled';
export type QueueStatus = 'waiting' | 'inside' | 'completed';

export interface Visit {
  id: string;
  date: string;
  doctor: string;
  department: string;
  symptoms: string;
  diagnosis: string;
  medicines: string[];
  notes: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  city: string;
  tag: PatientTag;
  lastVisit: string;
  doctor: string;
  visits: Visit[];
}

export interface Doctor {
  id: string;
  name: string;
  initials: string;
  specialization: string;
  department: string;
  days: string[];
  available: boolean;
  fee: number;
  bio: string;
  tint: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  phone: string;
  reason: string;
  token: number;
}

export interface QueueEntry {
  token: number;
  patientId: string;
  patientName: string;
  wait: string;
  status: QueueStatus;
}

export interface DoctorQueue {
  doctorId: string;
  doctorName: string;
  department: string;
  currentToken: number;
  patients: QueueEntry[];
}

export interface PharmacyItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  reorderAt: number;
  unit: string;
}

const visitFor = (id: string, doctor: string, department: string, date: string, symptoms: string, diagnosis: string, medicines: string[], notes: string): Visit => ({
  id,
  doctor,
  department,
  date,
  symptoms,
  diagnosis,
  medicines,
  notes,
});

export const doctors: Doctor[] = [
  {
    id: 'DOC-001', name: 'Dr. Kavya Shetty', initials: 'KS', specialization: 'General Physician', department: 'General Medicine',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], available: true, fee: 500, tint: 'blue',
    bio: 'Preventive care and everyday family medicine with a focus on clear, practical treatment plans.',
  },
  {
    id: 'DOC-002', name: 'Dr. Rajan Nair', initials: 'RN', specialization: 'Orthopaedic Surgeon', department: 'Orthopedics',
    days: ['Mon', 'Wed', 'Thu', 'Sat'], available: true, fee: 700, tint: 'cyan',
    bio: 'Evidence-led care for joint, muscle and mobility concerns across all age groups.',
  },
  {
    id: 'DOC-003', name: 'Dr. Priya Rao', initials: 'PR', specialization: 'Paediatrician', department: 'Pediatrics',
    days: ['Tue', 'Wed', 'Fri', 'Sat'], available: true, fee: 600, tint: 'violet',
    bio: 'Warm, family-centred paediatric care from newborn wellness through adolescence.',
  },
];

const patientNames = [
  ['Asha Menon', 34, 'Female', '99801 44218', 'VIP'],
  ['Rohan Bhat', 29, 'Male', '97421 31806', 'Regular'],
  ['Meera Pai', 41, 'Female', '98452 77109', 'Follow-up'],
  ['Arjun Shetty', 52, 'Male', '99862 50317', 'Regular'],
  ['Nisha Dsouza', 26, 'Female', '94814 88022', 'New'],
  ['Vikram Rao', 63, 'Male', '99008 11234', 'Follow-up'],
  ['Ananya Nayak', 8, 'Female', '97318 22519', 'Regular'],
  ['Ishaan Kumar', 11, 'Male', '99164 70028', 'New'],
  ['Shreya Hegde', 45, 'Female', '98804 41567', 'Regular'],
  ['Aditya Kulkarni', 37, 'Male', '99807 21289', 'Follow-up'],
  ['Farah Khan', 31, 'Female', '97409 61648', 'Regular'],
  ['Kiran Joseph', 58, 'Male', '98451 39011', 'VIP'],
  ['Lakshmi Acharya', 67, 'Female', '94803 54220', 'Follow-up'],
  ['Neil Fernandes', 23, 'Male', '99021 81560', 'New'],
  ['Sahana Poojary', 39, 'Female', '97316 10443', 'Regular'],
] as const;

export const patients: Patient[] = patientNames.map(([name, age, gender, phone, tag], index) => {
  const doctor = doctors[index % doctors.length];
  const diagnoses = ['Viral upper respiratory infection', 'Lumbar strain', 'Seasonal allergy', 'Type 2 diabetes review', 'Acute gastritis'];
  const medicineSets = [['Paracetamol 500mg', 'Cetirizine 10mg'], ['Aceclofenac 100mg', 'Calcium + D3'], ['Montelukast 10mg'], ['Metformin 500mg', 'Atorvastatin 10mg'], ['Pantoprazole 40mg']];
  const diagnosis = diagnoses[index % diagnoses.length];
  return {
    id: `ARU-${24001 + index}`,
    name,
    age,
    gender,
    phone,
    email: `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@mail.com`,
    city: index % 2 === 0 ? 'Vamanjoor' : 'Mangaluru',
    tag,
    lastVisit: index < 3 ? 'Today' : `${index + 2} Jun 2026`,
    doctor: doctor.name,
    visits: [
      visitFor(`VIS-${5100 + index}`, doctor.name, doctor.department, index < 3 ? '19 Aug 2026' : `${index + 2} Jun 2026`, index % 2 === 0 ? 'Mild fever, fatigue and body ache' : 'Recurring discomfort and low appetite', diagnosis, medicineSets[index % medicineSets.length], index % 2 === 0 ? 'Hydration, rest and review if symptoms persist beyond 72 hours.' : 'Continue current plan and return for review in two weeks.'),
      ...(index % 3 === 0 ? [visitFor(`VIS-${4100 + index}`, doctor.name, doctor.department, '22 Apr 2026', 'Routine follow-up', 'Stable on current treatment', ['Continue existing medication'], 'No red flags noted.')] : []),
    ],
  };
});

export const appointments: Appointment[] = [
  { id: 'APT-260819-01', patientId: 'ARU-24001', patientName: 'Asha Menon', doctorId: 'DOC-001', doctorName: 'Dr. Kavya Shetty', date: '19 Aug 2026', time: '09:30', status: 'Checked-In', phone: '99801 44218', reason: 'Fever and fatigue', token: 5 },
  { id: 'APT-260819-02', patientId: 'ARU-24002', patientName: 'Rohan Bhat', doctorId: 'DOC-002', doctorName: 'Dr. Rajan Nair', date: '19 Aug 2026', time: '10:00', status: 'Scheduled', phone: '97421 31806', reason: 'Knee pain', token: 3 },
  { id: 'APT-260819-03', patientId: 'ARU-24003', patientName: 'Meera Pai', doctorId: 'DOC-003', doctorName: 'Dr. Priya Rao', date: '19 Aug 2026', time: '10:30', status: 'Completed', phone: '98452 77109', reason: 'Allergy review', token: 2 },
  { id: 'APT-260819-04', patientId: 'ARU-24004', patientName: 'Arjun Shetty', doctorId: 'DOC-001', doctorName: 'Dr. Kavya Shetty', date: '19 Aug 2026', time: '11:00', status: 'Scheduled', phone: '99862 50317', reason: 'Diabetes review', token: 6 },
  { id: 'APT-260819-05', patientId: 'ARU-24005', patientName: 'Nisha Dsouza', doctorId: 'DOC-003', doctorName: 'Dr. Priya Rao', date: '19 Aug 2026', time: '11:30', status: 'Scheduled', phone: '94814 88022', reason: 'Routine checkup', token: 4 },
  { id: 'APT-260819-06', patientId: 'ARU-24006', patientName: 'Vikram Rao', doctorId: 'DOC-002', doctorName: 'Dr. Rajan Nair', date: '19 Aug 2026', time: '12:00', status: 'Cancelled', phone: '99008 11234', reason: 'Back pain', token: 5 },
  { id: 'APT-260819-07', patientId: 'ARU-24007', patientName: 'Ananya Nayak', doctorId: 'DOC-003', doctorName: 'Dr. Priya Rao', date: '19 Aug 2026', time: '15:00', status: 'Scheduled', phone: '97318 22519', reason: 'Cough and cold', token: 5 },
  { id: 'APT-260819-08', patientId: 'ARU-24008', patientName: 'Ishaan Kumar', doctorId: 'DOC-001', doctorName: 'Dr. Kavya Shetty', date: '19 Aug 2026', time: '16:00', status: 'Scheduled', phone: '99164 70028', reason: 'Stomach ache', token: 7 },
];

export const queues: DoctorQueue[] = [
  { doctorId: 'DOC-001', doctorName: 'Dr. Kavya Shetty', department: 'General Medicine', currentToken: 5, patients: [{ token: 5, patientId: 'ARU-24001', patientName: 'Asha Menon', wait: 'Now', status: 'inside' }, { token: 6, patientId: 'ARU-24004', patientName: 'Arjun Shetty', wait: '12 min', status: 'waiting' }, { token: 7, patientId: 'ARU-24008', patientName: 'Ishaan Kumar', wait: '28 min', status: 'waiting' }] },
  { doctorId: 'DOC-002', doctorName: 'Dr. Rajan Nair', department: 'Orthopedics', currentToken: 2, patients: [{ token: 3, patientId: 'ARU-24002', patientName: 'Rohan Bhat', wait: '18 min', status: 'waiting' }] },
  { doctorId: 'DOC-003', doctorName: 'Dr. Priya Rao', department: 'Pediatrics', currentToken: 1, patients: [{ token: 2, patientId: 'ARU-24003', patientName: 'Meera Pai', wait: 'Completed', status: 'completed' }, { token: 4, patientId: 'ARU-24005', patientName: 'Nisha Dsouza', wait: '20 min', status: 'waiting' }] },
];

export const pharmacy: PharmacyItem[] = [
  { id: 'MED-001', name: 'Paracetamol 500mg', category: 'Analgesic', stock: 248, reorderAt: 80, unit: 'tablets' },
  { id: 'MED-002', name: 'Cetirizine 10mg', category: 'Antihistamine', stock: 16, reorderAt: 40, unit: 'tablets' },
  { id: 'MED-003', name: 'Pantoprazole 40mg', category: 'Gastro', stock: 86, reorderAt: 30, unit: 'tablets' },
  { id: 'MED-004', name: 'Metformin 500mg', category: 'Diabetes', stock: 112, reorderAt: 40, unit: 'tablets' },
  { id: 'MED-005', name: 'Aceclofenac 100mg', category: 'Orthopedic', stock: 0, reorderAt: 25, unit: 'tablets' },
  { id: 'MED-006', name: 'ORS Sachets', category: 'Hydration', stock: 72, reorderAt: 20, unit: 'sachets' },
];

export const weeklyAppointments = [42, 56, 48, 64, 72, 58, 28];

