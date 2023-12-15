import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { TemperatureUnit } from '../../../core/models/temperature-unit.model';
import { TemperatureUnitService } from '../../../core/services/temperature-unit.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  tempUnitControl = new FormControl('celcius');

  constructor(private tempUnitService: TemperatureUnitService) { }

  get unit() {
    return this.tempUnitControl.value;
  }

  changeUnit() {
    const newUnit = this.unit;
    this.tempUnitService.changeUnit(newUnit as TemperatureUnit);
  }
}
