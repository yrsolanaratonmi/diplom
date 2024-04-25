import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Note, NotesService } from '../notes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(
    private readonly router: Router,
    private readonly notesService: NotesService
  ) {}

  notes$: Observable<Array<Note>> = this.notesService.notes$;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.notesService
      .getNotes()
      .subscribe((res) => this.notesService.notes$.next(res));
  }

  redirectToEdit(noteId: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const params = { openModal: 'true' };
    this.router.navigate([noteId], { queryParams: params });
  }
}
