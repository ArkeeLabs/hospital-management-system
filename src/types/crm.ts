export type TaskStatus = 'Approved' | 'Overdue' | 'Pending' | 'Rejected' | 'Submitted';

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Property {
  id: string;
  name: string;
  code: string;
  location: string;
  totalEmployees: number;
  activeTasks: number;
  isPrimary?: boolean;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  attendanceRate: number; // e.g. 96.5
  greenPoints: number;
  totalScore: number;
  joinDate: string;
  propertyId: string;
  phone: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assigneeName: string;
  assigneeAvatar: string;
  propertyId: string;
  propertyName: string;
  status: TaskStatus;
  priority: TaskPriority;
  greenPoints: number;
  dueDate: string;
  createdAt: string;
  department: string;
  commentsCount: number;
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'On Leave';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  checkIn: string | null;
  checkOut: string | null;
  hoursWorked: number;
}

export interface ReportItem {
  id: string;
  title: string;
  category: string;
  description: string;
  lastGenerated: string;
  fileSize: string;
  format: 'PDF' | 'CSV' | 'XLSX';
  downloadsCount: number;
}

export interface StatMetric {
  title: string;
  value: number | string;
  change: string;
  isPositive: boolean;
  icon: string;
  color: string;
  bgLight: string;
  bgDark: string;
}

export type InspectionStatus = 'Pass' | 'Fail' | 'Pending';

export interface Inspection {
  id: string;
  propertyName: string;
  inspectorName: string;
  date: string;
  status: InspectionStatus;
  score: number;
  notes: string;
  category: string;
}

export type InventoryStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: InventoryStatus;
  lastRestocked: string;
  supplierName: string;
}

export type SupplierStatus = 'Active' | 'Inactive' | 'Under Review';

export interface Supplier {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  rating: number;
  status: SupplierStatus;
}
