import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AutocompleteLocation } from '../../../core/models/autocomplete-option.model';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { LocationsService } from '../../../core/services/locations.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SnackBarService } from '../../../core/services/snack-bar.service';

@UntilDestroy()
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnInit {
  options: AutocompleteLocation[] = [];
  searchValueControl = new FormControl('');
  search$: Subject<any> = new Subject<any>();
  private readonly debounceTimeMs = 300;

  @Output() optionSelected: EventEmitter<AutocompleteLocation> = new EventEmitter<AutocompleteLocation>();

  get searchValue() {
    return this.searchValueControl.value;
  }

  constructor(private locationsService: LocationsService, private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.search$.pipe(
      untilDestroyed(this),
      debounceTime(this.debounceTimeMs)
    ).subscribe((searchValue) => {
      this.getAutocompleteOptions(searchValue);
    });
  }

  search() {
    this.search$.next(this.searchValue);
  }

  getAutocompleteOptions(input: string) {
    this.locationsService.getAutocomplete(input)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: options => this.options = options,
        error: err => {
          console.log('error:', err)
          this.snackBarService.openSnackBar(err.message)
        },
      });
  }

  onOptionSelected(option: AutocompleteLocation) {
    this.optionSelected.emit(option);
  }

  displayFn(key: string) {
    if (!key) return '';
    let index = this.options.findIndex(o => o.Key === key);
    const cityName = this.options[index].AdministrativeArea.LocalizedName;
    const countryName = this.options[index].Country.LocalizedName;
    return `${cityName}, ${countryName}`;
  }

  removeInput() {
    this.searchValueControl.reset();
  }
}
