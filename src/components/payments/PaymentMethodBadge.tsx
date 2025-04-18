
import { Payment } from "@/types";
import { Badge } from "@/components/ui/badge";
import { getPaymentMethodBadge } from "@/lib/utils/paymentUtils";

interface PaymentMethodBadgeProps {
  method: Payment['method'];
}

export function PaymentMethodBadge({ method }: PaymentMethodBadgeProps) {
  const { className } = getPaymentMethodBadge(method);
  const displayMethod = method.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <Badge variant="outline" className={className}>
      {displayMethod}
    </Badge>
  );
}
