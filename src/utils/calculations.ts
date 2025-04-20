
export const calculateItemTotal = (quantity: number, price: number, discount: number): number => {
  const subtotal = quantity * price;
  const discountAmount = (subtotal * discount) / 100;
  return subtotal - discountAmount;
};

export const calculateInvoiceSubtotal = (items: { quantity: number; price: number; discount: number }[]): number => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item.quantity, item.price, item.discount), 0);
};

export const calculateTax = (subtotal: number, taxRate: number = 18): number => {
  return (subtotal * taxRate) / 100;
};

export const generateInvoiceId = (): string => {
  const prefix = "INV";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
};
