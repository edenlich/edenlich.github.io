import { Component } from '@angular/core';
import { Forecast } from '../../../core/models/forecast.model';
import { WeatherService } from '../../../core/services/weather.service';
import { AutocompleteLocation } from '../../../core/models/autocomplete-option.model';
import { Location } from '../../../core/models/location.model';
import { DefaultLocation } from '../../../core/constants/default-location.constant';
import { FavoritesService } from '../../../core/services/favorites.service';
import { ActivatedRoute } from '@angular/router';
import { LocationsService } from '../../../core/services/locations.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { skip } from 'rxjs';
import { TemperatureUnitService } from '../../../core/services/temperature-unit.service';

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  currentForecast!: Forecast;
  currentLocation!: Location;
  isFavorite = false;

  constructor(
    private weatherService: WeatherService,
    private locationsService: LocationsService,
    private favoritesService: FavoritesService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private tempUnitService: TemperatureUnitService,
  ) {
    this.initPageView();
    this.tempUnitService.tempUnit$
      .pipe(untilDestroyed(this), skip(1))
      .subscribe(() => this.loadForecast(this.currentLocation));
  }

  initPageView() {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.locationsService.getLocationByKey(key)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => {
            const location = res;
            this.loadForecast(location);
          },
          error: err => this.snackBarService.openSnackBar(err.message),
        });
    } else {
      this.loadForecast({ key: DefaultLocation.KEY, name: DefaultLocation.NAME });
    }
  }

  onOptionSelected(option: AutocompleteLocation) {
    const key = option.Key;
    const name = `${option.AdministrativeArea.LocalizedName}, ${option.Country.LocalizedName}`;
    this.loadForecast({ key, name });
  }

  loadForecast(location: Location) {
    this.weatherService.getForecast(location.key)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          this.currentForecast = res;
          this.setCurrentLocation(location);
        },
        error: err => this.snackBarService.openSnackBar(err.message),
      });
  }

  setCurrentLocation(location: Location) {
    const isFavorite = this.favoritesService.isFavorite(location.key);
    this.isFavorite = isFavorite;
    this.currentLocation = location;
  }

  changeFavoriteStatus() {
    if (this.isFavorite) {
      this.favoritesService.removeFromFavorites(this.currentLocation.key);
    } else {
      this.favoritesService.addToFavorite(this.currentLocation);
    }
    this.isFavorite = !this.isFavorite;
  }
}
