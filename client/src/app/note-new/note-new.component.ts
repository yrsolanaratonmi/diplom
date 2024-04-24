import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, catchError, takeUntil } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AddNote, EditNote, Note, NotesState } from '../store/notes.state';

@Component({
  selector: 'app-note-new',
  templateUrl: './note-new.component.html',
  styleUrls: ['./note-new.component.scss'],
})
export class NoteNewComponent implements OnDestroy {
  @Select(NotesState) notes$!: Observable<Array<Note>>;

  private readonly destroy$ = new Subject();

  noteData: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    fileData: FormControl<null>;
  }> = new FormGroup({
    title: new FormControl('', Validators.required) as FormControl<string>,
    description: new FormControl(
      '',
      Validators.required
    ) as FormControl<string>,
    fileData: new FormControl(null),
  });

  file!: File | null;

  constructor(private readonly store: Store, private readonly router: Router) {}

  saveNew() {
    let id = 0;
    this.notes$
      .pipe(
        takeUntil(this.destroy$),
        map((notes) => {
          id = notes.length ? (notes.at(-1) as Note).id + 1 : 1;
        })
      )
      .subscribe();

    const data: Note = {
      id,
      title: this.noteData.controls.title.value as string,
      description: this.noteData.controls.description.value as string,
      fileData: this.noteData.controls.fileData.value,
      created: new Date(),
    };
    data.file = this.file;
    this.store.dispatch(new AddNote(data as Note));
    this.router.navigate([data.id]);
  }

  onFileChange() {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {
      this.file = (event.target as any).result;
    };

    reader.readAsDataURL(this.noteData.controls.fileData.value as any);
  }

  removeFile() {
    this.noteData.controls.fileData.setValue(null);
    this.file = null;
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
