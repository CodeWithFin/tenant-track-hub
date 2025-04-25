
import { toast } from "sonner";

export const showNotification = (
  message: string, 
  type: 'default' | 'success' | 'error' | 'warning' = 'default',
  options?: {
    description?: string;
    duration?: number;
  }
) => {
  switch(type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    default:
      toast(message, options);
  }
};

// Example notification types for different app events
export const NotificationTypes = {
  PAYMENT_RECEIVED: 'Payment received',
  MAINTENANCE_REQUEST_CREATED: 'Maintenance request submitted',
  LEASE_RENEWED: 'Lease renewed',
  RENT_DUE_SOON: 'Rent due soon'
};
