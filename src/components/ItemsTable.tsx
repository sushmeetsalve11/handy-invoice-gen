
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, IndianRupee } from 'lucide-react';
import { InvoiceItem } from '@/types/invoice';
import { calculateItemTotal } from '@/utils/calculations';

interface ItemsTableProps {
  items: InvoiceItem[];
  onItemChange: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  onItemDelete: (id: string) => void;
}

export const ItemsTable = ({ items, onItemChange, onItemDelete }: ItemsTableProps) => {
  return (
    <div className="rounded-lg border border-slate-300 bg-white shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 hover:bg-slate-100">
            <TableHead className="font-semibold text-slate-800">Item Name</TableHead>
            <TableHead className="w-[100px] font-semibold text-slate-800">Quantity</TableHead>
            <TableHead className="w-[120px] font-semibold text-slate-800">Price</TableHead>
            <TableHead className="w-[100px] font-semibold text-slate-800">Discount %</TableHead>
            <TableHead className="w-[120px] font-semibold text-slate-800">Total</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="hover:bg-slate-50 border-t border-slate-200">
              <TableCell>
                <Input
                  value={item.name}
                  onChange={(e) => onItemChange(item.id, 'name', e.target.value)}
                  placeholder="Item name"
                  className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                />
              </TableCell>
              <TableCell>
                <div className="relative">
                  <IndianRupee className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    className="pl-8 border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                    onChange={(e) => onItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={item.discount}
                  onChange={(e) => onItemChange(item.id, 'discount', parseFloat(e.target.value) || 0)}
                  className="border-slate-300 focus:border-blue-600 focus:ring-blue-600"
                />
              </TableCell>
              <TableCell className="font-medium text-slate-900">
                <div className="flex items-center gap-1">
                  <IndianRupee className="w-3 h-3" />
                  <span>{calculateItemTotal(item.quantity, item.price, item.discount).toFixed(2)}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onItemDelete(item.id)}
                  className="hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
