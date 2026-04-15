import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  { 
    path: 'dashboard', 
    component: HomeComponent 
  },
  { 
    path: '**', 
    redirectTo: 'dashboard' 
  }
];