export type TransactionType = 'subscription' | 'cancellation';
export type NotificationType = 'email' | 'sms';

export interface Fund {
  id: string;
  name: string;
  minimumAmount: number;
  category: string;
}

export interface TransactionRecord {
  id: string;
  fundName: string;
  type: TransactionType;
  amount: number;
  date: Date;
}

export interface Transaction {
  id: string;
  fundId: string;
  fundName: string;
  amount: number;
  date: Date;
  type: 'subscription' | 'cancellation';
  notificationMethod?: string; // Campo para el requerimiento 5
}

export interface Fund {
  id: string;
  name: string;
  minimumAmount: number;
  category: string;
}