import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './shared/pages/search/search.component';
import { FavoritesComponent } from './shared/pages/favorites/favorites.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { AutocompleteComponent } from './shared/components/autocomplete/autocomplete.component';
import { PageTitleComponent } from './shared/components/page-title/page-title.component';
import { ForecastItemComponent } from './shared/components/forecast-item/forecast-item.component';
import { CurrentWeatherItemComponent } from './shared/components/current-weather-item/current-weather-item.component';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavoritesComponent,
    NavBarComponent,
    AutocompleteComponent,
    PageTitleComponent,
    ForecastItemComponent,
    CurrentWeatherItemComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
