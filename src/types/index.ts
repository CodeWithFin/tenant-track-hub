export interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  units: number;
  imageUrl?: string;
  description?: string;
  yearBuilt?: number;
  amenities?: string;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyId: string;
  unitNumber: string;
  leaseStart: string;
  leaseEnd: string;
  rentAmount: number;
  status: 'active' | 'inactive' | 'pending';
  balance?: number;
  notes?: string;
  documents?: TenantDocument[];
  lastPaymentDate?: string;
}

export interface TenantDocument {
  id: string;
  tenantId: string;
  name: string;
  type: 'lease' | 'id' | 'other';
  uploadDate: string;
  fileUrl?: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  date: string;
  method: 'cash' | 'm-pesa' | 'bank transfer' | 'check' | 'paypal' | 'credit card' | 'debit card' | 'other';
  receiptId?: string;
  notes?: string;
  referenceNumber?: string;
  accountNumber?: string;
  bankName?: string;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  title: string;
  description: string;
  dateReported: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Receipt {
  id: string;
  paymentId: string;
  date: string;
  tenantId: string;
  tenantName: string;
  amount: number;
  receiptNumber: string;
  downloadUrl?: string;
}

// Extended badge variants for different statuses
export type BadgeVariant = 
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'  // Added for active status
  | 'warning'; // Added for pending status
