import { TestBed } from '@angular/core/testing';
import { PortfolioService } from './portfolio.service';
import { Fund } from '../models/portfolio.model';

describe('PortfolioService', () => {
  let service: PortfolioService;
  const mockFund: Fund = {
    id: 'test-1',
    name: 'Fondo de Prueba',
    minimumAmount: 100000,
    category: 'FIC'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioService);
  });

  it('debería inicializarse con un saldo de 500,000 y sin suscripciones', () => {
    expect(service.balance()).toBe(500000);
    expect(service.activeSubscriptions().length).toBe(0);
    expect(service.transactions().length).toBe(0);
  });

  it('debería restar el monto del saldo al suscribirse exitosamente', () => {
    service.subscribeToFund(mockFund, 'email');
    
    expect(service.balance()).toBe(400000);
    expect(service.activeSubscriptions()).toContain(mockFund);
    expect(service.transactions().length).toBe(1);
    expect(service.transactions()[0].type).toBe('subscription');
  });

  it('debería establecer un mensaje de error si el saldo es insuficiente', () => {
    const expensiveFund: Fund = { ...mockFund, minimumAmount: 600000 };
    
    service.subscribeToFund(expensiveFund, 'sms');
    
    expect(service.balance()).toBe(500000);
    expect(service.errorMessage()).toBe(`No tiene saldo para vincularse al fondo ${expensiveFund.name}`);
  });

  it('debería sumar el monto al saldo al cancelar una suscripción', () => {
    // Escenario previo: suscripción activa
    service.subscribeToFund(mockFund, 'email');
    expect(service.balance()).toBe(400000);

    // Acción: cancelar
    service.cancelSubscription(mockFund);
    
    expect(service.balance()).toBe(500000);
    expect(service.activeSubscriptions().length).toBe(0);
    expect(service.transactions()[0].type).toBe('cancellation');
  });
});