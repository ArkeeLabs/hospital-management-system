export interface ModuleRecord {
  id: string;
  name: string;
  category?: string;
  status: 'Active' | 'Pending' | 'Completed' | 'Overdue' | 'Approved' | 'Rejected';
  assignee?: string;
  date: string;
  amount?: number;
  notes?: string;
  propertyId: string;
}

export interface ModuleConfig {
  title: string;
  description: string;
  addLabel: string;
  columns: { key: keyof ModuleRecord | 'actions'; label: string; format?: 'currency' | 'status' | 'date' }[];
  categories?: string[];
  defaultStatus: ModuleRecord['status'];
}

export const MODULE_CONFIGS: Record<string, ModuleConfig> = {
  shops: {
    title: 'Suppliers & Shops',
    description: 'Manage vendor relationships, partner firms, and supply chain contacts.',
    addLabel: 'Add Supplier',
    categories: ['Dairy', 'Packaging', 'Equipment', 'Logistics', 'Maintenance'],
    defaultStatus: 'Active',
    columns: [
      { key: 'name', label: 'Supplier Name' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Status', format: 'status' },
      { key: 'assignee', label: 'Contact Person' },
      { key: 'date', label: 'Last Order', format: 'date' },
    ],
  },
  inventory: {
    title: 'Inventory Management',
    description: 'Track stock levels, reorder points, and warehouse allocations.',
    addLabel: 'Add Item',
    categories: ['Raw Materials', 'Finished Goods', 'Packaging', 'Supplies', 'Equipment'],
    defaultStatus: 'Active',
    columns: [
      { key: 'name', label: 'Item Name' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Stock Status', format: 'status' },
      { key: 'amount', label: 'Quantity', format: 'currency' },
      { key: 'date', label: 'Last Updated', format: 'date' },
    ],
  },
  'postpone-requests': {
    title: 'Postpone Requests',
    description: 'Review and approve deadline extension requests from team members.',
    addLabel: 'New Request',
    defaultStatus: 'Pending',
    columns: [
      { key: 'name', label: 'Task / Request' },
      { key: 'assignee', label: 'Requested By' },
      { key: 'status', label: 'Status', format: 'status' },
      { key: 'date', label: 'New Due Date', format: 'date' },
      { key: 'notes', label: 'Reason' },
    ],
  },
  apologies: {
    title: 'Apologies Log',
    description: 'Document service disruptions, delays, and customer apology records.',
    addLabel: 'Log Apology',
    defaultStatus: 'Completed',
    columns: [
      { key: 'name', label: 'Incident' },
      { key: 'assignee', label: 'Reported By' },
      { key: 'status', label: 'Status', format: 'status' },
      { key: 'date', label: 'Date', format: 'date' },
      { key: 'notes', label: 'Resolution' },
    ],
  },
  inspections: {
    title: 'Facility Inspections',
    description: 'Schedule and track facility safety and quality inspections.',
    addLabel: 'Schedule Inspection',
    categories: ['Safety', 'Quality', 'Hygiene', 'Equipment', 'Fire Safety'],
    defaultStatus: 'Pending',
    columns: [
      { key: 'name', label: 'Inspection' },
      { key: 'category', label: 'Type' },
      { key: 'assignee', label: 'Inspector' },
      { key: 'status', label: 'Status', format: 'status' },
      { key: 'date', label: 'Scheduled', format: 'date' },
    ],
  },
  purchases: {
    title: 'Purchases & Requisitions',
    description: 'Manage purchase orders, requisitions, and procurement workflows.',
    addLabel: 'New Requisition',
    defaultStatus: 'Pending',
    columns: [
      { key: 'name', label: 'Requisition' },
      { key: 'assignee', label: 'Requested By' },
      { key: 'amount', label: 'Amount', format: 'currency' },
      { key: 'status', label: 'Status', format: 'status' },
      { key: 'date', label: 'Date', format: 'date' },
    ],
  },
  payroll: {
    title: 'Payroll & Remuneration',
    description: 'Process payroll cycles, salary adjustments, and compensation records.',
    addLabel: 'Add Entry',
    defaultStatus: 'Completed',
    columns: [
      { key: 'name', label: 'Employee' },
      { key: 'category', label: 'Pay Period' },
      { key: 'amount', label: 'Net Pay', format: 'currency' },
      { key: 'status', label: 'Status', format: 'status' },
      { key: 'date', label: 'Processed', format: 'date' },
    ],
  },
  targets: {
    title: 'Quarterly Targets',
    description: 'Set and monitor quarterly performance targets across departments.',
    addLabel: 'Set Target',
    categories: ['Operations', 'Sales', 'Quality', 'Logistics', 'HR'],
    defaultStatus: 'Active',
    columns: [
      { key: 'name', label: 'Target Name' },
      { key: 'category', label: 'Department' },
      { key: 'amount', label: 'Goal', format: 'currency' },
      { key: 'status', label: 'Progress', format: 'status' },
      { key: 'date', label: 'Deadline', format: 'date' },
    ],
  },
  'target-matrix': {
    title: 'Target Sheet Matrix',
    description: 'Cross-department target alignment and performance matrix view.',
    addLabel: 'Add Matrix Entry',
    defaultStatus: 'Active',
    columns: [
      { key: 'name', label: 'Metric' },
      { key: 'category', label: 'Department' },
      { key: 'assignee', label: 'Owner' },
      { key: 'amount', label: 'Target %', format: 'currency' },
      { key: 'status', label: 'Status', format: 'status' },
    ],
  },
  'roster-sheet': {
    title: 'Shift Roster Sheet',
    description: 'Plan and manage employee shift schedules and rotations.',
    addLabel: 'Add Shift',
    categories: ['Morning', 'Afternoon', 'Night', 'Weekend', 'Holiday'],
    defaultStatus: 'Active',
    columns: [
      { key: 'name', label: 'Shift' },
      { key: 'assignee', label: 'Assigned To' },
      { key: 'category', label: 'Shift Type' },
      { key: 'status', label: 'Status', format: 'status' },
      { key: 'date', label: 'Date', format: 'date' },
    ],
  },
  'checklist-templates': {
    title: 'Checklist Templates',
    description: 'Create and manage reusable operational checklist templates.',
    addLabel: 'Create Template',
    categories: ['Opening', 'Closing', 'Safety', 'Quality', 'Maintenance'],
    defaultStatus: 'Active',
    columns: [
      { key: 'name', label: 'Template Name' },
      { key: 'category', label: 'Category' },
      { key: 'assignee', label: 'Created By' },
      { key: 'status', label: 'Status', format: 'status' },
      { key: 'date', label: 'Last Modified', format: 'date' },
    ],
  },
};
