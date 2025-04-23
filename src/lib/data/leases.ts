
import { Lease } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { addDays, format, isAfter, isBefore, parseISO } from "date-fns";

export const leases: Lease[] = [
  {
    id: "lease-001",
    tenantId: "ten-001",
    propertyId: "prop-001",
    unitNumber: "101",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    rentAmount: 75000,
    securityDeposit: 75000,
    status: "pending_renewal",
    documents: [
      {
        id: "doc-001",
        leaseId: "lease-001",
        name: "Lease Agreement 2023",
        type: "agreement",
        uploadDate: "2022-12-15"
      }
    ],
    terms: "Standard 12-month lease agreement",
    createdAt: "2022-12-15",
    updatedAt: "2022-12-15"
  },
  {
    id: "lease-002",
    tenantId: "ten-002",
    propertyId: "prop-001",
    unitNumber: "102",
    startDate: "2023-02-15",
    endDate: "2024-02-15",
    rentAmount: 85000,
    securityDeposit: 85000,
    status: "active",
    documents: [
      {
        id: "doc-002",
        leaseId: "lease-002",
        name: "Lease Agreement 2023",
        type: "agreement",
        uploadDate: "2023-02-10"
      }
    ],
    terms: "Standard 12-month lease agreement",
    createdAt: "2023-02-10",
    updatedAt: "2023-02-10"
  },
  {
    id: "lease-003",
    tenantId: "ten-003",
    propertyId: "prop-002",
    unitNumber: "A1",
    startDate: "2023-03-01",
    endDate: "2023-09-01",
    rentAmount: 65000,
    securityDeposit: 65000,
    status: "expired",
    documents: [
      {
        id: "doc-003",
        leaseId: "lease-003",
        name: "6-Month Lease Agreement",
        type: "agreement",
        uploadDate: "2023-02-20"
      }
    ],
    terms: "Short-term 6-month lease agreement",
    createdAt: "2023-02-20",
    updatedAt: "2023-02-20"
  },
  {
    id: "lease-004",
    tenantId: "ten-004",
    propertyId: "prop-003",
    unitNumber: "B2",
    startDate: "2023-05-15",
    endDate: "2024-05-15",
    rentAmount: 95000,
    securityDeposit: 95000,
    status: "active",
    documents: [
      {
        id: "doc-004",
        leaseId: "lease-004",
        name: "Commercial Lease Agreement",
        type: "agreement",
        uploadDate: "2023-05-10"
      },
      {
        id: "doc-005",
        leaseId: "lease-004",
        name: "Addendum - Parking",
        type: "addendum",
        uploadDate: "2023-05-12"
      }
    ],
    terms: "Commercial space lease with parking addendum",
    createdAt: "2023-05-10",
    updatedAt: "2023-05-12"
  },
  {
    id: "lease-005",
    tenantId: "ten-005",
    propertyId: "prop-004",
    unitNumber: "C3",
    startDate: "2023-01-01",
    endDate: "2024-01-01",
    rentAmount: 120000,
    securityDeposit: 120000,
    status: "terminated",
    documents: [
      {
        id: "doc-006",
        leaseId: "lease-005",
        name: "Residential Lease Agreement",
        type: "agreement",
        uploadDate: "2022-12-20"
      },
      {
        id: "doc-007",
        leaseId: "lease-005",
        name: "Termination Notice",
        type: "notice",
        uploadDate: "2023-07-15"
      }
    ],
    terms: "Standard 12-month lease agreement - terminated early due to tenant relocation",
    createdAt: "2022-12-20",
    updatedAt: "2023-07-15"
  }
];

export const getLeasesByTenant = (tenantId: string): Lease[] => {
  return leases.filter(lease => lease.tenantId === tenantId);
};

export const getLeasesByProperty = (propertyId: string): Lease[] => {
  return leases.filter(lease => lease.propertyId === propertyId);
};

export const getLeaseById = (id: string): Lease | undefined => {
  return leases.find(lease => lease.id === id);
};

export const getActiveLeases = (): Lease[] => {
  return leases.filter(lease => lease.status === 'active');
};

export const getExpiringLeases = (daysThreshold: number = 30): Lease[] => {
  const today = new Date();
  const thresholdDate = addDays(today, daysThreshold);
  
  return leases.filter(lease => {
    const endDate = parseISO(lease.endDate);
    return lease.status === 'active' && 
           isAfter(endDate, today) && 
           isBefore(endDate, thresholdDate);
  });
};

export const addLease = (lease: Omit<Lease, 'id' | 'createdAt' | 'updatedAt'>): Lease => {
  const now = format(new Date(), 'yyyy-MM-dd');
  const newLease: Lease = {
    ...lease,
    id: `lease-${uuidv4().substring(0, 8)}`,
    createdAt: now,
    updatedAt: now
  };
  leases.push(newLease);
  return newLease;
};
