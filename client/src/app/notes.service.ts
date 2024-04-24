import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, filter, map, tap} from 'rxjs';

export interface Note {
  id: number,
  title: string,
  description: string,
  created: Date
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes$ = new BehaviorSubject<Array<Note>>([])

  getNotes(): Observable<Array<Note>> {
    return this.notes$.asObservable();
  }

  addNote(note: Note) {
    const currentNotes = this.notes$.value;
    const updatedNotes = [...currentNotes, note];
    this.notes$.next(updatedNotes);
  }

  removeNote(noteId: number) {
    const currentNotes = this.notes$.value;
    const updatedNotes = currentNotes.filter((note: Note) => note.id !== noteId);
    this.notes$.next(updatedNotes);
  }

  editNote(updatedNote: Note) {
    const currentNotes = this.notes$.value;
    const updatedNotes = currentNotes.map((note: Note) =>
      note.id == updatedNote.id ? updatedNote : note
    );
    this.notes$.next(updatedNotes);
  }

  getSingleNote(noteId: number): Observable<any> {
    return this.notes$.pipe(
      map((notes: Array<Note>) => notes.find((note: Note) => note.id === noteId))
    );
  }
}
