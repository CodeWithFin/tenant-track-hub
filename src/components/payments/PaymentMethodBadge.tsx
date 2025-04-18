
import { Payment } from "@/types";
import { Badge } from "@/components/ui/badge";
import { getPaymentMethodBadge } from "@/lib/utils/paymentUtils";
import { 
  BanknoteIcon, 
  CreditCardIcon, 
  BuildingIcon, 
  CheckSquareIcon, 
  WalletIcon,
  SmartphoneIcon
} from "lucide-react";

interface PaymentMethodBadgeProps {
  method: Payment['method'];
  showIcon?: boolean;
}

export function PaymentMethodBadge({ method, showIcon = true }: PaymentMethodBadgeProps) {
  const { className } = getPaymentMethodBadge(method);
  const displayMethod = method.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  const getMethodIcon = () => {
    switch (method) {
      case "cash":
        return <BanknoteIcon className="h-3 w-3 mr-1" />;
      case "m-pesa":
        return <SmartphoneIcon className="h-3 w-3 mr-1" />;
      case "bank transfer":
        return <BuildingIcon className="h-3 w-3 mr-1" />;
      case "check":
        return <CheckSquareIcon className="h-3 w-3 mr-1" />;
      case "credit card":
      case "debit card":
        return <CreditCardIcon className="h-3 w-3 mr-1" />;
      default:
        return <WalletIcon className="h-3 w-3 mr-1" />;
    }
  };

  return (
    <Badge variant="outline" className={className}>
      {showIcon && getMethodIcon()}
      {displayMethod}
    </Badge>
  );
}
