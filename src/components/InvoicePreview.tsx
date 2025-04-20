
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Invoice } from '@/types/invoice';
import { IndianRupee } from 'lucide-react';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export const InvoicePreview = ({ invoice }: InvoicePreviewProps) => {
  return (
    <Card className="w-full bg-white shadow-lg border-slate-300">
      <CardHeader className="border-b border-slate-300 bg-slate-100">
        <CardTitle className="text-slate-800">Invoice Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-slate-800">Customer Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-md border border-slate-200">
              <div>
                <p className="text-slate-600">Name:</p>
                <p className="font-medium text-slate-900">{invoice.customer.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-600">Email:</p>
                <p className="font-medium text-slate-900">{invoice.customer.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-600">Phone:</p>
                <p className="font-medium text-slate-900">{invoice.customer.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-600">Address:</p>
                <p className="font-medium text-slate-900">{invoice.customer.address || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-slate-800">Items</h3>
            <div className="border border-slate-300 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-slate-800">Item</th>
                    <th className="px-4 py-2 text-right font-semibold text-slate-800">Qty</th>
                    <th className="px-4 py-2 text-right font-semibold text-slate-800">Price</th>
                    <th className="px-4 py-2 text-right font-semibold text-slate-800">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="border-t border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-2 text-slate-900">{item.name}</td>
                      <td className="px-4 py-2 text-right text-slate-900">{item.quantity}</td>
                      <td className="px-4 py-2 text-right text-slate-900">
                        <div className="flex items-center justify-end gap-1">
                          <IndianRupee className="w-3 h-3" />
                          {item.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right font-medium text-slate-900">
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
              <div className="w-64 space-y-2 bg-slate-50 p-4 rounded-md border border-slate-200">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal:</span>
                  <div className="flex items-center gap-1 text-slate-900">
                    <IndianRupee className="w-3 h-3" />
                    {invoice.subtotal.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax (18%):</span>
                  <div className="flex items-center gap-1 text-slate-900">
                    <IndianRupee className="w-3 h-3" />
                    {invoice.tax.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-slate-300">
                  <span className="text-slate-800">Total:</span>
                  <div className="flex items-center gap-1 text-slate-900">
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
