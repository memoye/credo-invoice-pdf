export interface Invoice {
  id: number;
  serviceCode: string;
  name: string;
  invoiceNumber: string;
  businessCode: string;
  amount: number;
  paidAmount: number;
  outstandingAmount: number;
  dueDate: string; // ISO string format
  invoiceDate: string; // ISO string format
  merchantRef: string;
  notes: string;
  currency: string;
  logoUrl: string;
  allowInstallment: number;
  installmentType: number;
  enableLateFee: number;
  enablePreReminder: number;
  preReminderType: string;
  preReminderFrequency: number;
  enablePostReminder: number;
  postReminderType: string;
  postReminderFrequency: number;
  lateFeeType: string;
  lateFeeCharge: number;
  lateFeeFrequency: number;
  status: number;
  installmentMinimumAmount: number;
  items: InvoiceItem[];
  tags: Tag[];
  documents: Document[];
  installments: Installment[];
  customers: Customer[];
  businessDetails: BusinessDetails;
  link: string;
}

export interface InvoiceTransactions {}

export interface InvoiceItem {
  id: number;
  description: string;
  name: string;
  qty: number;
  unitPrice: number;
  surcharge: number;
  discountCharge: number;
  discountType: number;
  discountTypeValue: number;
  discountTag: string;
  subTotal: number;
  documents: ItemDocument[]; // Structured representation for item documents
  links: Link[]; // Array of links associated with the item
  tags: Tag[]; // Tags related to the item
  surcharges: Surcharge[]; // Surcharges applied to the item
}

export interface ItemDocument {
  id: number;
  url: string;
  name?: string; // Optional name or description of the document
}

export interface Link {
  id: number;
  url: string;
  description?: string; // Optional description of the link
}

export interface Surcharge {
  id: number;
  type: string; // Type of surcharge, e.g., "Tax" or "Service Fee"
  amount: number; // Amount of the surcharge
}

export interface Tag {
  id: number;
  tag: string;
}

export interface Document {
  id: number;
  documentUrl: string;
}

export interface Installment {
  id: number;
  amount: number;
  configuredType: number;
  configuredValue: number;
  status: number;
  installmentDueDate: string;
  minimumAmount?: number;
  outstandingAmount: number;
  upcomingPayment: boolean;
  transaction?: Transaction;
}

export interface Transaction {
  id: number;
  customerInvoice: Customer;
  amount: number;
  feeAmount: number;
  reference: string;
  crn: string;
  transactionDate: string;
  businessRef: string;
  status?: number; // Use `Date` if you intend to parse this into a JavaScript Date object
}

export interface Customer {
  id: number;
  customerInvoiceNumber: string;
  amount: number;
  paidAmount: number;
  outstandingAmount: number;
  status: number;
  details: CustomerDetails;
  installments: Installment[];
}

export interface CustomerDetails {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  postalAddress: string;
}

export interface BusinessDetails {
  name: string;
  supportPhoneNumber: string;
  supportAddress: string;
  supportEmailAddress: string;
  website: string;
  facebookHandle: string;
  twitterHandle: string;
  instagramHandle: string;
  merchantInfo: MerchantInfo;
}

export interface MerchantInfo {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
}
