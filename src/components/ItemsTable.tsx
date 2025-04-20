
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead className="w-[100px]">Quantity</TableHead>
            <TableHead className="w-[120px]">Price</TableHead>
            <TableHead className="w-[100px]">Discount %</TableHead>
            <TableHead className="w-[120px]">Total</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Input
                  value={item.name}
                  onChange={(e) => onItemChange(item.id, 'name', e.target.value)}
                  placeholder="Item name"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                />
              </TableCell>
              <TableCell>
                <div className="relative">
                  <IndianRupee className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    className="pl-8"
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
                />
              </TableCell>
              <TableCell className="font-medium">
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
