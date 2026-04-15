import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
// Importa withHashLocation desde @angular/router
import { provideRouter, withHashLocation } from '@angular/router'; 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // Inyéctalo en el provideRouter
    provideRouter(routes, withHashLocation()), 
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};