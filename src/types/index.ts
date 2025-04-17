
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
  status: 'active' | 'inactive';
}

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  date: string;
  method: 'cash' | 'm-pesa' | 'bank transfer' | 'check' | 'other';
  receiptId?: string;
  notes?: string;
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
