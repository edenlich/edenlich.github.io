import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { CurrentWeather, CurrentWeatherResponse } from '../models/current-weather.model';
import { Forecast } from '../models/forecast.model';
import { http } from '../constants/http.constant';
import { TemperatureUnitService } from './temperature-unit.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private HttpClient: HttpClient, private tempUnitService: TemperatureUnitService) { }

  getCurrentWeather(locationKey: string): Observable<CurrentWeather> {
    let params = new HttpParams();
    params = params.append('apikey', http.KEY);

    return this.HttpClient.get<CurrentWeatherResponse[]>(`${http.API}/currentconditions/v1/${locationKey}`, { params })
      .pipe(
        map(res => res[0]),
        map(res => {
          return {
            ...res,
            Temperature: this.tempUnitService.unit === 'celcius' ? res.Temperature.Metric : res.Temperature.Imperial
          }
        })
      );
  }

  getForecast(locationKey: string): Observable<Forecast> {
    const metric = this.tempUnitService.unit === 'celcius';
    let params = new HttpParams();
    params = params.append('apikey', http.KEY);
    params = params.append('metric', metric);

    return this.HttpClient.get<Forecast>(`${http.API}/forecasts/v1/daily/5day/${locationKey}`, { params });
  }
}
