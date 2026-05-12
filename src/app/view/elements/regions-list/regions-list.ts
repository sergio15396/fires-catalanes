import { Component, computed, signal } from '@angular/core';
import { CATALAN_FAIRS } from '../../../model/fairs';
import { RegionFairsList } from '../region-fairs-list/region-fairs-list';

@Component({
  selector: 'app-regions-list',
  imports: [RegionFairsList],
  templateUrl: './regions-list.html',
  styleUrl: './regions-list.css',
})
export class RegionsList {
  private readonly storageKey = 'firesPreferides';

  // Dades principals de l'aplicació i estat seleccionat per l'usuari.
  public fairs = signal(CATALAN_FAIRS);
  public selectedRegion = signal('');
  public favoriteIds = signal<string[]>(this.loadFavorites());

  // Llistat de comarques obtingut a partir de les dades de les fires.
  public regions = computed(() => {
    const regionNames = this.fairs().map((fair) => fair.regionName);
    return [...new Set(regionNames)].filter(Boolean).sort();
  });

  // Fires filtrades segons la comarca seleccionada.
  public filteredFairs = computed(() =>
    this.fairs().filter((fair) => fair.regionName === this.selectedRegion())
  );

  // Fires marcades com a preferides.
  public favoriteFairs = computed(() =>
    this.fairs().filter((fair) => this.favoriteIds().includes(fair.activityId))
  );

  // Actualitza la comarca seleccionada des del desplegable.
  public selectRegion(region: string) {
    this.selectedRegion.set(region);
  }

  // Afegeix una fira a preferits i actualitza el LocalStorage.
  public addFavorite(fair: any) {
    if (this.favoriteIds().includes(fair.activityId)) {
      return;
    }

    const updatedFavorites = [...this.favoriteIds(), fair.activityId];
    this.favoriteIds.set(updatedFavorites);
    this.saveFavorites(updatedFavorites);
  }

  // Elimina una fira de preferits i actualitza el LocalStorage.
  public removeFavorite(activityId: string) {
    const updatedFavorites = this.favoriteIds().filter((id) => id !== activityId);
    this.favoriteIds.set(updatedFavorites);
    this.saveFavorites(updatedFavorites);
  }

  // Recupera els preferits guardats al navegador.
  private loadFavorites(): string[] {
    const savedFavorites = localStorage.getItem(this.storageKey);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }

  // Desa els preferits al navegador.
  private saveFavorites(favorites: string[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
