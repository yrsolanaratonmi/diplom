import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, catchError, takeUntil } from 'rxjs';
import { Note, NotesService } from '../notes.service';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.scss'],
})
export class NoteNewComponent implements OnDestroy {
  notes$: Observable<Array<Note>> = this.notesService.getNotes();

  private readonly destroy$ = new Subject();

  noteData: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
  }> = new FormGroup({
    title: new FormControl('', Validators.required) as FormControl<string>,
    description: new FormControl(
      '',
      Validators.required
    ) as FormControl<string>,
  });

  constructor(
    private readonly router: Router,
    private notesService: NotesService
  ) {}

  saveNew() {
    const data: Partial<Note> = {
      title: this.noteData.controls.title.value as string,
      description: this.noteData.controls.description.value as string,
      created: new Date(),
    };
    this.notesService.addNote(data).subscribe((note: Note) => {
      this.router.navigate([note._id]);
      this.notesService
        .getNotes()
        .subscribe((res) => this.notesService.notes$.next(res));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
