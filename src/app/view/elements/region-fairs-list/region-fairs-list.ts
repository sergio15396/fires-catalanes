import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-region-fairs-list',
  imports: [],
  templateUrl: './region-fairs-list.html',
  styleUrl: './region-fairs-list.css',
})
export class RegionFairsList {
  // Dades rebudes des del component pare.
  public fairs = input<any[]>([]);
  public favoriteFairs = input<any[]>([]);
  public favoriteIds = input<string[]>([]);
  public selectedRegion = input('');
  public showFavorites = input(false);

  // Esdeveniments que s'emeten cap al component pare.
  public favoriteAdded = output<any>();
  public favoriteRemoved = output<string>();

  // Identificador de la fira que té la informació detallada oberta.
  public openedFairId = signal('');

  // Fires que s'han de mostrar segons el mode actual.
  public visibleFairs = computed(() =>
    this.showFavorites() ? this.favoriteFairs() : this.fairs()
  );

  // Títol del llistat segons la pantalla actual.
  public title = computed(() =>
    this.showFavorites()
      ? 'Fires preferides'
      : this.selectedRegion()
        ? 'Fires de la comarca ' + this.selectedRegion()
        : 'Selecciona una comarca'
  );

  // Mostra o amaga la informació detallada d'una fira.
  public toggleInfo(activityId: string) {
    this.openedFairId.set(this.openedFairId() === activityId ? '' : activityId);
  }

  // Comprova si una fira ja està marcada com a preferida.
  public isFavorite(fair: any) {
    return this.favoriteIds().includes(fair.activityId);
  }

  // Emet l'esdeveniment per afegir una fira a preferits.
  public addFavorite(fair: any) {
    this.favoriteAdded.emit(fair);
  }

  // Emet l'esdeveniment per eliminar una fira de preferits.
  public removeFavorite(fair: any) {
    this.favoriteRemoved.emit(fair.activityId);
  }
}
