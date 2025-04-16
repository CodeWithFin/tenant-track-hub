
import { MaintenanceRequest } from "@/types";
import { v4 as uuidv4 } from 'uuid';

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

export const getMaintenanceForProperty = (propertyId: string): MaintenanceRequest[] => {
  return maintenanceRequests.filter(request => request.propertyId === propertyId);
};

export const getPendingMaintenanceCount = (): number => {
  return maintenanceRequests.filter(request => request.status === 'pending').length;
};

export const addMaintenanceRequest = (request: Omit<MaintenanceRequest, 'id'>): MaintenanceRequest => {
  const newRequest = { ...request, id: `maint-${uuidv4().substr(0, 8)}` };
  maintenanceRequests.push(newRequest);
  return newRequest;
};
