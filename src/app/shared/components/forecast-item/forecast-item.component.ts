import { Component, Input } from '@angular/core';
import { DailyForecast } from '../../../core/models/forecast.model';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrl: './forecast-item.component.scss'
})
export class ForecastItemComponent {
  private _forecast!: DailyForecast;
  minValue: string = '';
  maxValue: string = '';

  @Input() set forecast(val: DailyForecast) {
    this._forecast = val;
    this.setMinValue(Math.floor(val.Temperature.Minimum.Value));
    this.setMaxValue(Math.floor(val.Temperature.Maximum.Value))
  }

  get forecast() {
    return this._forecast;
  }

  setMinValue(value: number) {
    this.minValue = value < 0 ? `(${value})` : `${value}`;
  }

  setMaxValue(value: number) {
    this.maxValue = value < 0 ? `(${value})` : `${value}`;
  }

  // get MinValue() {
  //   return this.forecast
  // }
}
