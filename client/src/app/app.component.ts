import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'notes';

  constructor(
    private readonly router: Router,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    this.notesService.getNotes();
  }

  addNote() {
    this.router.navigate(['/new']);
  }
}
