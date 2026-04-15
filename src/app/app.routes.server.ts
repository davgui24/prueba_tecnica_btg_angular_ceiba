import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'dashboard',
    renderMode: RenderMode.Client
  },
  {
    // Cualquier otra ruta no especificada o rutas estáticas futuras 
    // (ej. páginas de marketing) pueden pre-renderizarse para mejorar el SEO y el tiempo de carga.
    path: '**',
    renderMode: RenderMode.Prerender
  }
];