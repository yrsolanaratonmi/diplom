import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject, filter, map, tap } from 'rxjs';

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

  private readonly _isDarkMode$ = new BehaviorSubject<boolean>(
    !!localStorage.getItem('isDarkMode')
  );

  get isDarkMode$(): BehaviorSubject<boolean> {
    return this._isDarkMode$;
  }

  set isDarkMode$(val: boolean) {
    this._isDarkMode$.next(val);
    localStorage.setItem('isDarkMode', val.toString());
  }

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  getNotes(): Observable<Array<Note>> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token'),
    });
    return this.http.get<Array<Note>>('http://localhost:3000/allTasks', {
      headers: headers,
    });
  }

  addNote(note: Partial<Note>): Observable<Note> {
    const { created, description, title } = note;

    const currentNotes = this.notes$.value;
    const updatedNotes = [...currentNotes, note];
    this.notes$.next(updatedNotes);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token'),
    });
    return this.http.post<Note>(
      'http://localhost:3000/task',
      {
        created,
        description,
        title,
      },
      { headers: headers }
    );
  }

  removeNote(noteId: string) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token'),
    });
    const currentNotes = this.notes$.value;
    const updatedNotes = currentNotes.filter(
      (note: Note) => note._id !== noteId
    );

    this.http
      .delete(`http://localhost:3000/task?_id=${noteId}`, { headers: headers })
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
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token'),
    });
    this.http
      .patch(
        'http://localhost:3000/task',
        {
          created,
          description,
          _id,
          title,
        },
        { headers: headers }
      )
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
