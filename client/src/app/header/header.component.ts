import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  darkMode = false;

  // changeMode () {
  //   this.darkMode = !this.darkMode
  //   this.store.dispatch(new EditMode())
  // }
}
