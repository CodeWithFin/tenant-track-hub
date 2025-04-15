
import { Property, Tenant, Payment, MaintenanceRequest } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// Mock Properties Data
export const properties: Property[] = [
  {
    id: "prop-001",
    name: "Riverside Apartments",
    address: "123 River Lane, Riverside",
    type: "Apartment Building",
    units: 8,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2835&ixlib=rb-4.0.3",
  },
  {
    id: "prop-002",
    name: "Garden Villas",
    address: "456 Garden Road, Greenfield",
    type: "Townhouses",
    units: 4,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
  },
  {
    id: "prop-003",
    name: "City View Complex",
    address: "789 Urban Street, Downtown",
    type: "Commercial Building",
    units: 6,
    imageUrl: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
  },
  {
    id: "prop-004",
    name: "Sunset Homes",
    address: "101 Sunset Blvd, Westside",
    type: "Single Family Homes",
    units: 3,
    imageUrl: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3",
  },
];

// Mock Tenants Data
export const tenants: Tenant[] = [
  {
    id: "ten-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    propertyId: "prop-001",
    unitNumber: "101",
    leaseStart: "2023-01-01",
    leaseEnd: "2024-01-01",
    rentAmount: 1200,
    status: "active",
  },
  {
    id: "ten-002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-987-6543",
    propertyId: "prop-001",
    unitNumber: "102",
    leaseStart: "2023-02-15",
    leaseEnd: "2024-02-15",
    rentAmount: 1250,
    status: "active",
  },
  {
    id: "ten-003",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    phone: "+1-555-345-6789",
    propertyId: "prop-002",
    unitNumber: "201",
    leaseStart: "2023-03-01",
    leaseEnd: "2024-03-01",
    rentAmount: 1500,
    status: "active",
  },
  {
    id: "ten-004",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@example.com",
    phone: "+1-555-789-0123",
    propertyId: "prop-002",
    unitNumber: "202",
    leaseStart: "2023-04-01",
    leaseEnd: "2023-10-01",
    rentAmount: 1550,
    status: "inactive",
  },
  {
    id: "ten-005",
    firstName: "David",
    lastName: "Brown",
    email: "david.b@example.com",
    phone: "+1-555-234-5678",
    propertyId: "prop-003",
    unitNumber: "301",
    leaseStart: "2023-05-15",
    leaseEnd: "2024-05-15",
    rentAmount: 1800,
    status: "active",
  },
];

// Mock Payments Data
export const payments: Payment[] = [
  {
    id: "pay-001",
    tenantId: "ten-001",
    propertyId: "prop-001",
    amount: 1200,
    date: "2023-08-01",
    method: "bank transfer",
    notes: "August rent",
  },
  {
    id: "pay-002",
    tenantId: "ten-001",
    propertyId: "prop-001",
    amount: 1200,
    date: "2023-09-02",
    method: "bank transfer",
    notes: "September rent",
  },
  {
    id: "pay-003",
    tenantId: "ten-002",
    propertyId: "prop-001",
    amount: 1250,
    date: "2023-09-01",
    method: "m-pesa",
    notes: "September rent",
  },
  {
    id: "pay-004",
    tenantId: "ten-003",
    propertyId: "prop-002",
    amount: 1500,
    date: "2023-09-05",
    method: "cash",
    notes: "September rent",
  },
  {
    id: "pay-005",
    tenantId: "ten-005",
    propertyId: "prop-003",
    amount: 1800,
    date: "2023-09-03",
    method: "bank transfer",
    notes: "September rent",
  },
];

// Mock Maintenance Requests Data
export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "maint-001",
    propertyId: "prop-001",
    tenantId: "ten-001",
    title: "Leaking Faucet",
    description: "The kitchen sink faucet is leaking and causing water damage to the cabinet below.",
    dateReported: "2023-08-15",
    status: "completed",
    priority: "medium",
  },
  {
    id: "maint-002",
    propertyId: "prop-001",
    tenantId: "ten-002",
    title: "AC Not Working",
    description: "The air conditioning unit is not cooling the apartment. It's just blowing room temperature air.",
    dateReported: "2023-09-01",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "maint-003",
    propertyId: "prop-002",
    tenantId: "ten-003",
    title: "Broken Window",
    description: "The window in the living room is cracked and needs to be replaced.",
    dateReported: "2023-09-10",
    status: "pending",
    priority: "medium",
  },
  {
    id: "maint-004",
    propertyId: "prop-003",
    tenantId: "ten-005",
    title: "Mailbox Key Lost",
    description: "I've lost my mailbox key and need a replacement.",
    dateReported: "2023-09-08",
    status: "pending",
    priority: "low",
  },
];

// Helper functions for data manipulation
export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getTenantById = (id: string): Tenant | undefined => {
  return tenants.find(tenant => tenant.id === id);
};

export const getPaymentsForTenant = (tenantId: string): Payment[] => {
  return payments.filter(payment => payment.tenantId === tenantId);
};

export const getMaintenanceForProperty = (propertyId: string): MaintenanceRequest[] => {
  return maintenanceRequests.filter(request => request.propertyId === propertyId);
};

export const getTenantsForProperty = (propertyId: string): Tenant[] => {
  return tenants.filter(tenant => tenant.propertyId === propertyId);
};

export const addProperty = (property: Omit<Property, 'id'>): Property => {
  const newProperty = { ...property, id: `prop-${uuidv4().substr(0, 8)}` };
  properties.push(newProperty);
  return newProperty;
};

export const addTenant = (tenant: Omit<Tenant, 'id'>): Tenant => {
  const newTenant = { ...tenant, id: `ten-${uuidv4().substr(0, 8)}` };
  tenants.push(newTenant);
  return newTenant;
};

export const addPayment = (payment: Omit<Payment, 'id'>): Payment => {
  const newPayment = { ...payment, id: `pay-${uuidv4().substr(0, 8)}` };
  payments.push(newPayment);
  return newPayment;
};

export const addMaintenanceRequest = (request: Omit<MaintenanceRequest, 'id'>): MaintenanceRequest => {
  const newRequest = { ...request, id: `maint-${uuidv4().substr(0, 8)}` };
  maintenanceRequests.push(newRequest);
  return newRequest;
};

export const getTotalRentCollected = (): number => {
  return payments.reduce((total, payment) => total + payment.amount, 0);
};

export const getPendingMaintenanceCount = (): number => {
  return maintenanceRequests.filter(request => request.status === 'pending').length;
};

export const getActiveTenantsCount = (): number => {
  return tenants.filter(tenant => tenant.status === 'active').length;
};

export const getVacancyRate = (): number => {
  const totalUnits = properties.reduce((sum, property) => sum + property.units, 0);
  const occupiedUnits = tenants.filter(tenant => tenant.status === 'active').length;
  return totalUnits > 0 ? ((totalUnits - occupiedUnits) / totalUnits) * 100 : 0;
};
