import { Routes } from '@angular/router';
import { Home } from './view/elements/home/home';
import { RegionsList } from './view/elements/regions-list/regions-list';
import { FavoritesList } from './view/elements/favorites-list/favorites-list';

export const routes: Routes = [
  // Ruta per defecte. Redirigeix a 'home'.
  { path: '', component: Home },

  // Rutes específiques per a les diferents seccions de l'aplicació.
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'fires', component: RegionsList },
  { path: 'favorits', component: FavoritesList },

  // Si l'usuari intenta accedir a una ruta que no existeix, redirigeix a 'home'.
  { path: '**', redirectTo: '' },
];