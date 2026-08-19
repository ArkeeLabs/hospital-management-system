import React, { createContext, useContext, useState } from 'react';
import type { Property, Employee, Task, AttendanceRecord, ReportItem, TaskStatus, Inspection, InventoryItem, Supplier } from '../types/crm';
import initialProperties from '../data/properties.json';
import initialEmployees from '../data/employees.json';
import initialTasks from '../data/tasks.json';
import initialAttendance from '../data/attendance.json';
import initialReports from '../data/reports.json';
import initialInspections from '../data/inspections.json';
import initialInventory from '../data/inventory.json';
import initialSuppliers from '../data/suppliers.json';

interface AppContextType {
  selectedProperty: Property;
  setSelectedProperty: (property: Property) => void;
  properties: Property[];
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'commentsCount'>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id' | 'joinDate'>) => void;
  attendance: AttendanceRecord[];
  reports: ReportItem[];
  inspections: Inspection[];
  inventory: InventoryItem[];
  suppliers: Supplier[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  resetDemoData: () => void;
  filteredTasks: Task[];
  filteredEmployees: Employee[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties] = useState<Property[]>(initialProperties as Property[]);
  const [selectedProperty, setSelectedProperty] = useState<Property>(initialProperties[0] as Property);
  const [tasks, setTasks] = useState<Task[]>(initialTasks as Task[]);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees as Employee[]);
  const [attendance] = useState<AttendanceRecord[]>(initialAttendance as AttendanceRecord[]);
  const [reports] = useState<ReportItem[]>(initialReports as ReportItem[]);
  const [inspections, setInspections] = useState<Inspection[]>(initialInspections as Inspection[]);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory as InventoryItem[]);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers as Supplier[]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const addTask = (newTaskData: Omit<Task, 'id' | 'createdAt' | 'commentsCount'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `TSK-${Math.floor(800 + Math.random() * 200)}`,
      createdAt: new Date().toISOString().split('T')[0],
      commentsCount: 0,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const addEmployee = (newEmpData: Omit<Employee, 'id' | 'joinDate'>) => {
    const newEmp: Employee = {
      ...newEmpData,
      id: `emp-${Math.floor(200 + Math.random() * 300)}`,
      joinDate: new Date().toISOString().split('T')[0],
    };
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const resetDemoData = () => {
    setTasks(initialTasks as Task[]);
    setEmployees(initialEmployees as Employee[]);
    setInspections(initialInspections as Inspection[]);
    setInventory(initialInventory as InventoryItem[]);
    setSuppliers(initialSuppliers as Supplier[]);
    setSelectedProperty(initialProperties[0] as Property);
    setSearchQuery('');
    setIsMobileSidebarOpen(false);
  };

  // Filter tasks based on selected property & global search
  const filteredTasks = tasks.filter((task) => {
    const matchesProperty =
      selectedProperty.id === 'prop-all' || task.propertyId === selectedProperty.id;
    const matchesSearch =
      searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assigneeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProperty && matchesSearch;
  });

  // Filter employees based on selected property & global search
  const filteredEmployees = employees.filter((emp) => {
    const matchesProperty =
      selectedProperty.id === 'prop-all' || emp.propertyId === selectedProperty.id;
    const matchesSearch =
      searchQuery === '' ||
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProperty && matchesSearch;
  });

  return (
    <AppContext.Provider
      value={{
        selectedProperty,
        setSelectedProperty,
        properties,
        tasks,
        addTask,
        updateTaskStatus,
        employees,
        addEmployee,
        attendance,
        reports,
        inspections,
        inventory,
        suppliers,
        searchQuery,
        setSearchQuery,
        isSidebarCollapsed,
        toggleSidebar,
        isMobileSidebarOpen,
        toggleMobileSidebar,
        closeMobileSidebar,
        resetDemoData,
        filteredTasks,
        filteredEmployees,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
