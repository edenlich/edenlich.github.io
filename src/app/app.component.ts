import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Search';
  titleByRoute: Record<string, string> = {
    search: 'Search',
    favorites: 'Favorites',
  };

  constructor(private router: Router) {
    this.getPageTitle();
  }

  getPageTitle() {
    this.router.events.pipe(
      (untilDestroyed(this)),
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      const titleByRouteKey = Object.keys(this.titleByRoute).find((key) => url.includes(key));
      this.title = titleByRouteKey ? this.titleByRoute[titleByRouteKey] : '';
    });
  }
}
