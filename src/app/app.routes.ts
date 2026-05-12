import { Routes } from '@angular/router';
import { Home } from './view/elements/home/home';
import { RegionsList } from './view/elements/regions-list/regions-list';
import { FavoritesList } from './view/elements/favorites-list/favorites-list';

export const routes: Routes = [
  // Ruta inicial i redirecció per defecte.
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Pàgines principals de l'aplicació.
  { path: 'home', component: Home },
  { path: 'fires', component: RegionsList },
  { path: 'favorits', component: FavoritesList },

  // Redirecció en cas d'introduir una ruta no existent.
  { path: '**', redirectTo: 'home' },
];
