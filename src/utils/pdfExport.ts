
import jsPDF from 'jspdf';
import { Invoice } from '@/types/invoice';

export const exportToPDF = (invoice: Invoice) => {
  const pdf = new jsPDF();
  const margin = 20;
  let yPos = margin;

  // Header
  pdf.setFontSize(20);
  pdf.text('INVOICE', margin, yPos);
  
  // Invoice details
  pdf.setFontSize(12);
  yPos += 20;
  pdf.text(`Invoice #: ${invoice.id}`, margin, yPos);
  pdf.text(`Date: ${invoice.date.toLocaleDateString()}`, margin, yPos + 10);
  pdf.text(`Due Date: ${invoice.dueDate.toLocaleDateString()}`, margin, yPos + 20);

  // Customer details
  yPos += 40;
  pdf.text('Bill To:', margin, yPos);
  pdf.setFontSize(11);
  pdf.text(invoice.customer.name, margin, yPos + 10);
  pdf.text(invoice.customer.email, margin, yPos + 20);
  pdf.text(invoice.customer.phone, margin, yPos + 30);
  pdf.text(invoice.customer.address, margin, yPos + 40);

  // Items table
  yPos += 60;
  const headers = ['Item', 'Qty', 'Price', 'Discount', 'Total'];
  const columnWidths = [60, 20, 30, 30, 30];
  let xPos = margin;

  // Table headers
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  headers.forEach((header, i) => {
    pdf.text(header, xPos, yPos);
    xPos += columnWidths[i];
  });

  // Table content
  pdf.setFont('helvetica', 'normal');
  invoice.items.forEach((item, index) => {
    yPos += 10;
    xPos = margin;
    
    pdf.text(item.name, xPos, yPos);
    pdf.text(item.quantity.toString(), xPos + columnWidths[0], yPos);
    pdf.text(`$${item.price.toFixed(2)}`, xPos + columnWidths[0] + columnWidths[1], yPos);
    pdf.text(`${item.discount}%`, xPos + columnWidths[0] + columnWidths[1] + columnWidths[2], yPos);
    pdf.text(`$${item.total.toFixed(2)}`, xPos + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], yPos);
  });

  // Totals
  yPos += 20;
  pdf.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 140, yPos);
  pdf.text(`Tax (18%): $${invoice.tax.toFixed(2)}`, 140, yPos + 10);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Total: $${invoice.total.toFixed(2)}`, 140, yPos + 20);

  // Footer
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text('Thank you for your business!', margin, 270);

  // Save the PDF
  pdf.save(`Invoice_${invoice.id}.pdf`);
};
