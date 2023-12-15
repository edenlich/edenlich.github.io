import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentWeather } from '../../../core/models/current-weather.model';
import { Location } from '../../../core/models/location.model';
import { WeatherService } from '../../../core/services/weather.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { TemperatureUnitService } from '../../../core/services/temperature-unit.service';

@UntilDestroy()
@Component({
  selector: 'app-current-weather-item',
  templateUrl: './current-weather-item.component.html',
  styleUrl: './current-weather-item.component.scss'
})
export class CurrentWeatherItemComponent implements OnInit {
  @Input() location!: Location;
  currentWeather!: CurrentWeather;

  @Output() removeFromFavorites: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private weatherService: WeatherService,
    private snackBarService: SnackBarService,
    private tempUnitService: TemperatureUnitService
  ) { }

  ngOnInit(): void {
    this.loadCurrentWeather();
    this.tempUnitService.tempUnit$.pipe(untilDestroyed(this)).subscribe(() => this.loadCurrentWeather());
  }

  loadCurrentWeather() {
    this.weatherService.getCurrentWeather(this.location.key)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: res => this.currentWeather = res,
        error: err => this.snackBarService.openSnackBar(err.message),
      });
  }

  onRemoveFromFavorites() {
    console.log('onRemoveFromFavorites-comppp', this.location.key);
    this.removeFromFavorites.emit(this.location.key);
  }
}
