import { AddNote, NotesState } from './../store/notes.state';
import { Component } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {EditMode} from '../store/darkMode.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  darkMode = false

  constructor (private readonly store: Store) {}

  changeMode () {
    this.darkMode = !this.darkMode
    this.store.dispatch(new EditMode())
  }
}
