
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Invoice, Customer, InvoiceItem } from '@/types/invoice';
import { generateInvoiceId, calculateInvoiceSubtotal, calculateTax } from '@/utils/calculations';
import { ItemsTable } from '@/components/ItemsTable';

export const InvoiceForm = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    id: generateInvoiceId(),
    date: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    customer: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
  });

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoice(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [name]: value,
      },
    }));
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
    };
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>New Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceId">Invoice ID</Label>
                <Input id="invoiceId" value={invoice.id} disabled />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={invoice.date.toISOString().split('T')[0]} />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Name</Label>
                  <Input
                    id="customerName"
                    name="name"
                    value={invoice.customer.name}
                    onChange={handleCustomerChange}
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    name="email"
                    type="email"
                    value={invoice.customer.email}
                    onChange={handleCustomerChange}
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">Phone</Label>
                  <Input
                    id="customerPhone"
                    name="phone"
                    value={invoice.customer.phone}
                    onChange={handleCustomerChange}
                  />
                </div>
                <div>
                  <Label htmlFor="customerAddress">Address</Label>
                  <Input
                    id="customerAddress"
                    name="address"
                    value={invoice.customer.address}
                    onChange={handleCustomerChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Items</h3>
                <Button onClick={addItem}>Add Item</Button>
              </div>
              <ItemsTable
                items={invoice.items}
                onItemChange={(id, field, value) => {
                  setInvoice(prev => {
                    const newItems = prev.items.map(item =>
                      item.id === id ? { ...item, [field]: value } : item
                    );
                    const subtotal = calculateInvoiceSubtotal(newItems);
                    const tax = calculateTax(subtotal);
                    return {
                      ...prev,
                      items: newItems,
                      subtotal,
                      tax,
                      total: subtotal + tax,
                    };
                  });
                }}
                onItemDelete={(id) => {
                  setInvoice(prev => {
                    const newItems = prev.items.filter(item => item.id !== id);
                    const subtotal = calculateInvoiceSubtotal(newItems);
                    const tax = calculateTax(subtotal);
                    return {
                      ...prev,
                      items: newItems,
                      subtotal,
                      tax,
                      total: subtotal + tax,
                    };
                  });
                }}
              />
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-end gap-4 text-right">
                <div className="w-[200px]">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${invoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Tax (18%):</span>
                    <span>${invoice.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${invoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => {
                  // Save functionality could be added here
                }}>
                  Save Invoice
                </Button>
                <Button onClick={() => {
                  // Import and use the exportToPDF function
                  import('@/utils/pdfExport').then(module => {
                    module.exportToPDF(invoice);
                  });
                }}>
                  Export as PDF
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
