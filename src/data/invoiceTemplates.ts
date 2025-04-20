
import { Invoice } from "@/types/invoice";

export const invoiceTemplates: Record<string, Partial<Invoice>> = {
  "Basic Service": {
    items: [
      {
        id: "1",
        name: "Professional Services",
        quantity: 1,
        price: 5000,
        discount: 0,
        total: 5000,
      }
    ]
  },
  "Web Development": {
    items: [
      {
        id: "1",
        name: "Website Design",
        quantity: 1,
        price: 15000,
        discount: 10,
        total: 13500,
      },
      {
        id: "2",
        name: "Website Development",
        quantity: 1,
        price: 25000,
        discount: 5,
        total: 23750,
      }
    ]
  },
  "Consultation": {
    items: [
      {
        id: "1",
        name: "Initial Consultation",
        quantity: 2,
        price: 2500,
        discount: 0,
        total: 5000,
      },
      {
        id: "2",
        name: "Follow-up Session",
        quantity: 1,
        price: 1500,
        discount: 10,
        total: 1350,
      }
    ]
  }
};
