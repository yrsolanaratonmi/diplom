import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Select} from '@ngxs/store';
import {DarkModeState} from './store/darkMode.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notes';

  constructor(private readonly router: Router) {}

  @Select(DarkModeState) darkMode!: Observable<boolean>;

  addNote() {
    this.router.navigate(['/new'])
  }
}
