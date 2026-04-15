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