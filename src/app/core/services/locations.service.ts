import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AutocompleteLocation } from '../models/autocomplete-option.model';
import { http } from '../constants/http.constant';
import { Location } from '../models/location.model';
import { GetLocationResponse } from '../models/get-location-response.model';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  constructor(private HttpClient: HttpClient) { }

  getAutocomplete(input: string): Observable<AutocompleteLocation[]> {
    let params = new HttpParams();
    params = params.append('apikey', http.KEY);
    params = params.append('q', input);
    return this.HttpClient.get<AutocompleteLocation[]>(`${http.API}/locations/v1/cities/autocomplete`, { params });
  }

  getLocationByKey(key: string): Observable<Location> {
    let params: HttpParams = new HttpParams();
    params = params.append('apikey', http.KEY);

    return this.HttpClient.get<GetLocationResponse>(`http://dataservice.accuweather.com/locations/v1/${key}`, { params })
      .pipe(map(res => {
        return { key, name: `${res.LocalizedName}, ${res.Country.LocalizedName}` }
      }));
  }
}
