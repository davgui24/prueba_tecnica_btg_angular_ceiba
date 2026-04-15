import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Fund } from '../../models/portfolio.model';
import { firstValueFrom } from 'rxjs';
import { PortfolioService } from '../../services/portfolio';
import { ApiMockService } from '../../services/api-mock';
import { SubscribeDialogComponent } from '../../components/subscribe-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSnackBarModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
  public portfolio = inject(PortfolioService);
  private apiMock = inject(ApiMockService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  // Signals para el estado de la vista
  availableFunds = signal<Fund[]>([]);
  isLoading = signal<boolean>(true);
  apiError = signal<boolean>(false);

  ngOnInit() {
    this.loadFunds();
  }

  async loadFunds() {
    this.isLoading.set(true);
    this.apiError.set(false);
    try {
      const funds = await firstValueFrom(this.apiMock.getAvailableFunds());
      this.availableFunds.set(funds);
    } catch (error) {
      this.apiError.set(true);
    } finally {
      this.isLoading.set(false);
    }
  }

  isSubscribed(fundId: string): boolean {
    return this.portfolio.activeSubscriptions().some(f => f.id === fundId);
  }

  openSubscribeDialog(fund: Fund) {
    const dialogRef = this.dialog.open(SubscribeDialogComponent, {
      width: '400px',
      data: fund,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((notificationMethod: 'EMAIL' | 'SMS' | undefined) => {
      if (notificationMethod) {
        this.confirmSubscription(fund, notificationMethod);
      }
    });
  }

  private confirmSubscription(fund: Fund, method: string) {
    try {
      this.portfolio.subscribe(fund, method);
      this.snackBar.open(`Suscripción exitosa. Notificación por ${method}`, 'Cerrar', { duration: 3000 });
    } catch (err: any) {
      this.snackBar.open(err.message || 'Error en la suscripción', 'Cerrar', { duration: 3000 });
    }
  }
}