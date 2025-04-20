
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Invoice, Customer, InvoiceItem } from '@/types/invoice';
import { generateInvoiceId, calculateInvoiceSubtotal, calculateTax } from '@/utils/calculations';
import { ItemsTable } from '@/components/ItemsTable';
import { InvoicePreview } from '@/components/InvoicePreview';
import { invoiceTemplates } from '@/data/invoiceTemplates';
import { IndianRupee, Eye, EyeOff, LayoutTemplate } from 'lucide-react';

export const InvoiceForm = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [invoice, setInvoice] = useState<Invoice>({
    id: generateInvoiceId(),
    date: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
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

  const handleTemplateSelect = (templateName: string) => {
    const template = invoiceTemplates[templateName];
    if (template && template.items) {
      setInvoice(prev => {
        const newItems = [...template.items];
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
    }
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
    <div className="container mx-auto p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>New Invoice</CardTitle>
              <div className="flex items-center gap-2">
                <Select onValueChange={handleTemplateSelect}>
                  <SelectTrigger className="w-[200px]">
                    <LayoutTemplate className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(invoiceTemplates).map((template) => (
                      <SelectItem key={template} value={template}>
                        {template}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
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
                    <Input
                      id="date"
                      type="date"
                      value={invoice.date.toISOString().split('T')[0]}
                    />
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
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-3 h-3" />
                          <span>{invoice.subtotal.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Tax (18%):</span>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-3 h-3" />
                          <span>{invoice.tax.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-3 h-3" />
                          <span>{invoice.total.toFixed(2)}</span>
                        </div>
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

        {showPreview && (
          <div className="lg:sticky lg:top-6">
            <InvoicePreview invoice={invoice} />
          </div>
        )}
      </div>
    </div>
  );
};
