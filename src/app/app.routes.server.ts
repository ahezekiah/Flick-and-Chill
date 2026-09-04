import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic routes
  {
    path: 'movie/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'tv/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'person/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'details/:type/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'genres/movie/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'genres/tv/:id',
    renderMode: RenderMode.Server
  },

  // Static routes
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
