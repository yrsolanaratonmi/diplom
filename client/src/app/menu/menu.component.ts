import { Select, Store } from '@ngxs/store';
import { Component } from '@angular/core';
import {Note, NotesState} from '../store/notes.state';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor (private readonly router: Router) {}

  @Select(NotesState) notes$!: Observable<Array<Note>>;


  redirectToEdit(noteId: number, event: Event) {
    event.preventDefault()
    event.stopPropagation()
    const params = {openModal: 'true'}
    this.router.navigate([noteId], {queryParams: params})
  }
}
