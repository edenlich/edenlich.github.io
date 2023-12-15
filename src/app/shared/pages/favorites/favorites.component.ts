import { Component, OnInit } from '@angular/core';
import { Location } from '../../../core/models/location.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favorites: Location[] = [];

  constructor(private favoritesService: FavoritesService, private router: Router) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritesService.favorites$
      .pipe(untilDestroyed(this))
      .subscribe((f) => this.favorites = f);
  }

  onRemoveFromFavorites(key: string) {
    this.favoritesService.removeFromFavorites(key);
  }

  navigateToForecast(key: string) {
    this.router.navigateByUrl(`/search/${key}`);
  }
}
