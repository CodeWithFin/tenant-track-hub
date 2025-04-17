
import { Tenant, TenantDocument } from "@/types";
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
    balance: 0,
    lastPaymentDate: "2023-12-01",
    notes: "Good tenant, always pays on time.",
    documents: [
      {
        id: "doc-001",
        tenantId: "ten-001",
        name: "Lease Agreement",
        type: "lease",
        uploadDate: "2022-12-15"
      }
    ]
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
    balance: 85000,
    lastPaymentDate: "2023-11-10",
    notes: "Late payment in November",
    documents: [
      {
        id: "doc-002",
        tenantId: "ten-002",
        name: "Lease Agreement",
        type: "lease",
        uploadDate: "2023-02-10"
      }
    ]
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
    balance: 0,
    lastPaymentDate: "2023-12-01",
    notes: "Has requested maintenance for bathroom sink"
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
    balance: 0,
    lastPaymentDate: "2023-09-28",
    notes: "Moved out at end of lease term"
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
    balance: 18750,
    lastPaymentDate: "2023-12-01",
    notes: "Partial payment in December"
  },
  {
    id: "ten-006",
    firstName: "Mary",
    lastName: "Njeri",
    email: "mary.njeri@example.com",
    phone: "+254-733-123-789",
    propertyId: "prop-003",
    unitNumber: "302",
    leaseStart: "2024-01-01",
    leaseEnd: "2025-01-01",
    rentAmount: 78000,
    status: "pending",
    notes: "Lease starts January 1st, deposit received"
  }
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

export const getTenantsByStatus = (status: Tenant['status']): Tenant[] => {
  return tenants.filter(tenant => tenant.status === status);
};

export const getTenantsWithBalance = (): Tenant[] => {
  return tenants.filter(tenant => (tenant.balance || 0) > 0);
};

export const addTenant = (tenant: Omit<Tenant, 'id'>): Tenant => {
  const newTenant = { ...tenant, id: `ten-${uuidv4().substring(0, 8)}` };
  tenants.push(newTenant);
  return newTenant;
};

export const updateTenant = (updatedTenant: Tenant): Tenant => {
  const index = tenants.findIndex(tenant => tenant.id === updatedTenant.id);
  if (index !== -1) {
    tenants[index] = updatedTenant;
  }
  return updatedTenant;
};

export const deleteTenant = (id: string): boolean => {
  const index = tenants.findIndex(tenant => tenant.id === id);
  if (index !== -1) {
    tenants.splice(index, 1);
    return true;
  }
  return false;
};

export const addTenantDocument = (tenantId: string, document: Omit<TenantDocument, 'id' | 'tenantId'>): TenantDocument | null => {
  const tenant = getTenantById(tenantId);
  if (!tenant) return null;
  
  const newDocument = {
    ...document,
    id: `doc-${uuidv4().substring(0, 8)}`,
    tenantId
  };
  
  if (!tenant.documents) {
    tenant.documents = [];
  }
  
  tenant.documents.push(newDocument);
  return newDocument;
};

export const removeTenantDocument = (tenantId: string, documentId: string): boolean => {
  const tenant = getTenantById(tenantId);
  if (!tenant || !tenant.documents) return false;
  
  const initialLength = tenant.documents.length;
  tenant.documents = tenant.documents.filter(doc => doc.id !== documentId);
  
  return tenant.documents.length < initialLength;
};
