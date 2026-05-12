import { Component, computed, signal } from '@angular/core';
import { CATALAN_FAIRS } from '../../../model/fairs';
import { RegionFairsList } from '../region-fairs-list/region-fairs-list';

@Component({
    selector: 'app-favorites-list',
    imports: [RegionFairsList],
    templateUrl: './favorites-list.html',
    styleUrl: './favorites-list.css',
})
export class FavoritesList {
    private readonly storageKey = 'firesPreferides';

    // Dades de les fires i identificadors de les fires preferides.
    public fairs = signal(CATALAN_FAIRS);
    public favoriteIds = signal<string[]>(this.loadFavorites());

    // Fires preferides obtingudes a partir dels identificadors guardats.
    public favoriteFairs = computed(() =>
        this.fairs().filter((fair) => this.favoriteIds().includes(fair.activityId))
    );

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

    // Desa els preferits actualitzats al navegador.
    private saveFavorites(favorites: string[]) {
        localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
}
