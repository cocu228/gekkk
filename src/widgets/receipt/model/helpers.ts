export function getStatusTitle(status: string): string {
  const titles = {
    PROCESSING: "Processing",
    COMPLETED: "Transaction completed",
    BANK_CANCELLED: "Transaction cancelled",
    INSUFFICIENT_FUNDS: "Insufficient funds",
    REFUND: "Refunded",
    HOLD: "On hold",
    WAITING_INFO: "Waiting information",
    UNKNOWN: "Unknown status"
  };

  return titles[status];
}

export function getMethodTitle(method: string): string {
  const titles = {
    PAYMENT_CARD: "By card number",
    PAYMENT_PHONE: "By phone number",
    PAYMENT_SEPA: "SEPA transfer",
    PAYMENT_CRYPTO: "Crypto transfer",
    PAYMENT_BY_LINK: "By link",
    TOPUP_BY_CARD: "Top up by card",
    PAYMENT_ONE_TOUCH: "One touch transfer",
    PAYMENT_SWIFT: "SWIFT transfer"
  };

  return titles[method];
}
