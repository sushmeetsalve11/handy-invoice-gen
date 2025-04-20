
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Invoice } from '@/types/invoice';
import { IndianRupee } from 'lucide-react';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export const InvoicePreview = ({ invoice }: InvoicePreviewProps) => {
  return (
    <Card className="w-full bg-white shadow-lg">
      <CardHeader className="border-b">
        <CardTitle>Invoice Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Customer Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-medium">{invoice.customer.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{invoice.customer.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium">{invoice.customer.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Address:</p>
                <p className="font-medium">{invoice.customer.address || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Items</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-right">Qty</th>
                    <th className="px-4 py-2 text-right">Price</th>
                    <th className="px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2 text-right">{item.quantity}</td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <IndianRupee className="w-3 h-3" />
                          {item.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <IndianRupee className="w-3 h-3" />
                          {item.total.toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {invoice.subtotal.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (18%):</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {invoice.tax.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {invoice.total.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
