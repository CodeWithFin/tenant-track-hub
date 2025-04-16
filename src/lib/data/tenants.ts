
import { Tenant } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// Mock Tenants Data with realistic Kenyan rent amounts
export const tenants: Tenant[] = [
  {
    id: "ten-001",
    firstName: "John",
    lastName: "Kamau",
    email: "john.kamau@example.com",
    phone: "+254-722-123-456",
    propertyId: "prop-001",
    unitNumber: "101",
    leaseStart: "2023-01-01",
    leaseEnd: "2024-01-01",
    rentAmount: 75000, 
    status: "active",
  },
  {
    id: "ten-002",
    firstName: "Jane",
    lastName: "Wanjiru",
    email: "jane.wanjiru@example.com",
    phone: "+254-733-987-654",
    propertyId: "prop-001",
    unitNumber: "102",
    leaseStart: "2023-02-15",
    leaseEnd: "2024-02-15",
    rentAmount: 85000,
    status: "active",
  },
  {
    id: "ten-003",
    firstName: "Michael",
    lastName: "Omondi",
    email: "michael.o@example.com",
    phone: "+254-722-345-678",
    propertyId: "prop-002",
    unitNumber: "201",
    leaseStart: "2023-03-01",
    leaseEnd: "2024-03-01",
    rentAmount: 65000,
    status: "active",
  },
  {
    id: "ten-004",
    firstName: "Sarah",
    lastName: "Achieng",
    email: "sarah.a@example.com",
    phone: "+254-733-789-012",
    propertyId: "prop-002",
    unitNumber: "202",
    leaseStart: "2023-04-01",
    leaseEnd: "2023-10-01",
    rentAmount: 68000,
    status: "inactive",
  },
  {
    id: "ten-005",
    firstName: "David",
    lastName: "Mutua",
    email: "david.m@example.com",
    phone: "+254-722-234-567",
    propertyId: "prop-003",
    unitNumber: "301",
    leaseStart: "2023-05-15",
    leaseEnd: "2024-05-15",
    rentAmount: 75000,
    status: "active",
  },
];

export const getTenantById = (id: string): Tenant | undefined => {
  return tenants.find(tenant => tenant.id === id);
};

export const getTenantsForProperty = (propertyId: string): Tenant[] => {
  return tenants.filter(tenant => tenant.propertyId === propertyId);
};

export const getActiveTenantsCount = (): number => {
  return tenants.filter(tenant => tenant.status === 'active').length;
};

export const addTenant = (tenant: Omit<Tenant, 'id'>): Tenant => {
  const newTenant = { ...tenant, id: `ten-${uuidv4().substr(0, 8)}` };
  tenants.push(newTenant);
  return newTenant;
};
