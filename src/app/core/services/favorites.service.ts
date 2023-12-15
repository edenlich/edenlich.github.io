import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Location[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  get favorites() {
    return this.favoritesSubject.getValue();
  }

  addToFavorite(location: Location) {
    const favorites = [...this.favorites, location];
    this.favoritesSubject.next(favorites);
  }

  removeFromFavorites(key: string) {
    const filteredFavorites = this.favorites.filter((f) => f.key !== key);
    this.favoritesSubject.next(filteredFavorites);
  }

  isFavorite(key: string): boolean {
    return !!this.favorites.find((f) => f.key === key);
  }
}
