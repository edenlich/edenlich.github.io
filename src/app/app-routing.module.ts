import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './shared/pages/search/search.component';
import { FavoritesComponent } from './shared/pages/favorites/favorites.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'search/:key', component: SearchComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: 'search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
