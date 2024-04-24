import {inject} from '@angular/core';
import { CanActivateFn } from '@angular/router';
import {map} from 'rxjs/internal/operators/map';
import {Store} from '@ngxs/store';
import {NotesState} from './store/notes.state';

export const isNoteExistsGuard: CanActivateFn = (route) => {
  let isNoteExists = false
  const store = inject(Store)
  const id = route.params['id']
  store.select(NotesState).pipe(
    map(notes => {
      const note = notes.find((el: any) => el.id == id)
      note && (isNoteExists = true)
    })
  ).subscribe()
  return isNoteExists
};
