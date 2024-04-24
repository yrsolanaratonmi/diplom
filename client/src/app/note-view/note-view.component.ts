import {Component, Inject, Injector} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject, combineLatest, forkJoin, switchMap, takeUntil, tap} from 'rxjs';
import {map} from 'rxjs/internal/operators/map';
import {Store} from '@ngxs/store';
import {Note, NotesState, RemoveNote} from '../store/notes.state';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {NoteEditComponent} from '../note-edit/note-edit.component';


@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent {
  constructor(
    private router: Router,
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    @Inject(TuiDialogService) private readonly dialog: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) { }


  destroy$ = new Subject()

  ngOnInit(): void {
    combineLatest([this.note$, this.route.queryParams]).pipe(
      takeUntil(this.destroy$),
    ).subscribe(res => {
      if (res[1]['openModal']) {
        this.edit(res[0])
      }
    })
  }

  note$: Observable<Note> = this.route.params.pipe(
    takeUntil(this.destroy$),
    map(params => params['id']),
    switchMap(routeId => this.store.select(NotesState).pipe(
      map((notes: Array<Note>) => notes.find((note: Note) => note.id === +routeId) as Note),
    )),
  )

  remove(noteId?: number) {
    this.store.dispatch(new RemoveNote(noteId || 0))
    this.router.navigate([''])
  }

  edit(note: Note) {
    this.dialog.open(new PolymorpheusComponent(NoteEditComponent, this.injector), {
      data: note,
      size: 'l',
    }).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next(null)
    this.destroy$.complete()
  }
}
