import { Injectable, signal, computed } from '@angular/core';
import { Fund, Transaction } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  // Estado inicial: Saldo de 500,000 COP como suele pedir la prueba
  balance = signal<number>(500000);
  activeSubscriptions = signal<Fund[]>([]);
  transactions = signal<Transaction[]>([]);

  /**
   * Punto 5: Realiza la suscripción validando saldo y guardando el método de notificación
   */
  subscribe(fund: Fund, notificationMethod: string) {
    const currentBalance = this.balance();

    // 1. Validación de saldo
    if (currentBalance < fund.minimumAmount) {
      throw new Error(`No tiene saldo disponible para vincularse al fondo ${fund.name}`);
    }

    // 2. Actualizar saldo
    this.balance.set(currentBalance - fund.minimumAmount);

    // 3. Agregar a suscripciones activas
    this.activeSubscriptions.update(subs => [...subs, fund]);

    // 4. Registrar la transacción
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      fundId: fund.id,
      fundName: fund.name,
      amount: fund.minimumAmount,
      date: new Date(),
      type: 'subscription',
      notificationMethod: notificationMethod // Se almacena según el requerimiento 5
    };

    this.transactions.update(txs => [newTransaction, ...txs]);
  }

  /**
   * Permite cancelar una suscripción y devolver el dinero al saldo
   */
  cancelSubscription(fund: Fund) {
    const isSubscribed = this.activeSubscriptions().find(f => f.id === fund.id);
    
    if (!isSubscribed) return;

    // 1. Devolver dinero
    this.balance.update(b => b + fund.minimumAmount);

    // 2. Remover de suscripciones activas
    this.activeSubscriptions.update(subs => subs.filter(f => f.id !== fund.id));

    // 3. Registrar transacción de cancelación
    const cancellationTx: Transaction = {
      id: crypto.randomUUID(),
      fundId: fund.id,
      fundName: fund.name,
      amount: fund.minimumAmount,
      date: new Date(),
      type: 'cancellation'
    };

    this.transactions.update(txs => [cancellationTx, ...txs]);
  }
}