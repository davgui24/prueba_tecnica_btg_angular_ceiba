import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { Fund } from '../models/portfolio.model';

@Component({
  selector: 'app-subscribe-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatRadioModule, FormsModule],
  template: `
    <h2 mat-dialog-title>Configurar Notificación</h2>
    <mat-dialog-content>
      <p>Selecciona cómo deseas recibir notificaciones de <strong>{{ data.name }}</strong>:</p>
      <mat-radio-group [(ngModel)]="method" style="display: flex; flex-direction: column; margin-top: 15px; gap: 10px;">
        <mat-radio-button value="EMAIL">Correo Electrónico (Email)</mat-radio-button>
        <mat-radio-button value="SMS">Mensaje de Texto (SMS)</mat-radio-button>
      </mat-radio-group>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cancelar</button>
      <button mat-flat-button color="primary" (click)="dialogRef.close(method)">Confirmar</button>
    </mat-dialog-actions>
  `
})
export class SubscribeDialogComponent {
  public dialogRef = inject(MatDialogRef<SubscribeDialogComponent>);
  public data = inject<Fund>(MAT_DIALOG_DATA);
  method: 'EMAIL' | 'SMS' = 'EMAIL';
}