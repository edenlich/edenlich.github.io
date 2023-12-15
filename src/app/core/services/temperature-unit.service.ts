import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TemperatureUnit } from '../models/temperature-unit.model';

@Injectable({
  providedIn: 'root'
})
export class TemperatureUnitService {
  private tempUnitSubject = new BehaviorSubject<TemperatureUnit>('celcius');
  tempUnit$ = this.tempUnitSubject.asObservable();

  get unit() {
    return this.tempUnitSubject.getValue();
  }

  changeUnit(unit: TemperatureUnit) {
    this.tempUnitSubject.next(unit);
  }
}
