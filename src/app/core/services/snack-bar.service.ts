import { Injectable } from '@angular/core';
import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private readonly durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(text: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      data: { text }
    });
  }
}
