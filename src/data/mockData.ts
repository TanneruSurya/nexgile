export const USERS = {
  CUSTOMER: 'Customer',
  INTERNAL: 'Internal',
};

export const CORE_DATA = {
  BOMs: [
    { id: 'BOM-001', partName: 'Main Chassis Assembly', version: 'V2.1', status: 'Released', owner: 'Internal', lastModified: '2024-03-01' },
    { id: 'BOM-002', partName: 'Control PCB', version: 'V1.4', status: 'In Review', owner: 'Internal', lastModified: '2024-03-04' },
    { id: 'BOM-003', partName: 'Power Supply Unit', version: 'V3.0', status: 'Released', owner: 'Customer', lastModified: '2024-02-15' },
  ],
  NCRs: [
    { id: 'NCR-1024', description: 'Dimension mismatch on base plate', severity: 'High', status: 'Open', owner: 'Internal', date: '2024-03-05' },
    { id: 'NCR-1025', description: 'Coating thickness below spec', severity: 'Medium', status: 'In Analysis', owner: 'Customer', date: '2024-03-06' },
  ],
  RMAs: [
    { id: 'RMA-501', customer: 'Global Dynamics', reason: 'Defective Sensor', status: 'Received', owner: 'Customer', date: '2024-02-28' },
    { id: 'RMA-502', customer: 'TechFlow Sys', reason: 'Calibration Drift', status: 'In Repair', owner: 'Internal', date: '2024-03-01' },
    { id: 'RMA-503', customer: 'AeroLink', reason: 'Cosmetic Damage', status: 'Approved', owner: 'Customer', date: '2024-03-05' },
  ],
  POs: [
    { id: 'PO-9821', vendor: 'MetalTech Inc', amount: '$45,000', status: 'Confirmed', owner: 'Internal', date: '2024-03-02' },
    { id: 'PO-9822', vendor: 'ElectroPart', amount: '$12,300', status: 'Pending Approval', owner: 'Customer', date: '2024-03-05' },
    { id: 'PO-9823', vendor: 'ChipSource', amount: '$8,900', status: 'Shipped', owner: 'Internal', date: '2024-03-06' },
    { id: 'PO-9824', vendor: 'Precision Fab', amount: '$32,150', status: 'In Production', owner: 'Internal', date: '2024-03-07' },
  ],
  ECOs: [
    { id: 'ECO-2024-01', description: 'Thermal Pad Upgrade', part: 'PCB-Main-V2', status: 'Draft', owner: 'Internal', date: '2024-03-05' },
    { id: 'ECO-2024-02', description: 'Alternative Capacitor Source', part: 'PSU-001', status: 'Reviewing', owner: 'Customer', date: '2024-03-06' },
    { id: 'ECO-2024-03', description: 'Connector Re-orientation', part: 'Chassis-B', status: 'Approved', owner: 'Internal', date: '2024-03-07' },
  ],
};

export const AUDIT_HISTORY = [
  { id: 1, target: 'BOM-001', user: 'j.doe@nexgile.com', action: 'Update Version', timestamp: '2024-03-01 14:30:00' },
  { id: 2, target: 'BOM-001', user: 's.smith@customer.com', action: 'Approve BOM', timestamp: '2024-03-02 09:15:00' },
  { id: 3, target: 'NCR-1024', user: 'q.manager@nexgile.com', action: 'Create NCR', timestamp: '2024-03-05 16:45:00' },
];

export const PRODUCTION_DATA = [
  { name: 'Mon', wip: 400, yield: 95, plan: 380 },
  { name: 'Tue', wip: 300, yield: 92, plan: 350 },
  { name: 'Wed', wip: 500, yield: 98, plan: 480 },
  { name: 'Thu', wip: 450, yield: 94, plan: 450 },
  { name: 'Fri', wip: 470, yield: 97, plan: 460 },
];

export const TIMELINE_TASKS = [
  { id: 1, name: 'Design Phase', start: '2024-01-01', end: '2024-02-15', status: 'Completed', role: 'Internal' },
  { id: 2, name: 'Prototyping', start: '2024-02-16', end: '2024-03-31', status: 'In Progress', role: 'Internal' },
  { id: 3, name: 'Customer Review', start: '2024-03-15', end: '2024-04-10', status: 'Pending', role: 'Customer' },
];
