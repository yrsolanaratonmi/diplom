import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';

export interface Note {
  title: string;
  description: string;
  created: Date;
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes$ = new BehaviorSubject<Array<any>>([]);

  constructor(private readonly http: HttpClient) {}

  getNotes(): Observable<Array<Note>> {
    return this.http.get<Array<Note>>('http://localhost:3000/allTasks');
  }

  addNote(note: Partial<Note>): Observable<Note> {
    const { created, description, title } = note;

    const currentNotes = this.notes$.value;
    const updatedNotes = [...currentNotes, note];
    this.notes$.next(updatedNotes);
    return this.http.post<Note>('http://localhost:3000/task', {
      created,
      description,
      title,
    });
  }

  removeNote(noteId: string) {
    const currentNotes = this.notes$.value;
    const updatedNotes = currentNotes.filter(
      (note: Note) => note._id !== noteId
    );

    this.http
      .delete(`http://localhost:3000/task?_id=${noteId}`)
      .subscribe(console.log);
    this.notes$.next(updatedNotes);
  }

  editNote(updatedNote: Partial<Note>) {
    const { created, description, _id, title } = updatedNote;
    console.log(updatedNote);
    const currentNotes = this.notes$.value;
    const updatedNotes = currentNotes.map((note: Note) =>
      note._id == updatedNote._id ? updatedNote : note
    );
    this.http
      .patch('http://localhost:3000/task', {
        created,
        description,
        _id,
        title,
      })
      .subscribe(console.log);
    this.notes$.next(updatedNotes);
  }

  getSingleNote(noteId: string): Observable<any> {
    return this.notes$.pipe(
      map((notes: Array<Note>) =>
        notes.find((note: Note) => note._id === noteId)
      )
    );
  }
}
