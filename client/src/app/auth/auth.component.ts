import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TuiDialogContext } from '@taiga-ui/core/interfaces/dialog-context';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(
    private authService: AuthService,
    private readonly cookieService: CookieService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext,
    private readonly notesService: NotesService
  ) {}
  message$ = new Subject();
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,}$'),
    ]),
  });

  login() {
    this.authService.login(this.authForm.value).subscribe({
      next: (res: any) => {
        if (res.message) {
          this.message$.next(res.message);
        }
        if (res.token) {
          this.cookieService.set('token', res.token);
          this.authService.isUserLoggedIn$.next(true);
          this.context.completeWith();
          this.notesService.getNotes();
        }
      },
      error: (res: any) => this.message$.next(res.error.message),
    });
  }

  register() {
    this.authService.register(this.authForm.value).subscribe({
      next: (res: any) => {
        this.context.completeWith();
      },
      error: (res: any) => this.message$.next(res.error.message),
    });
  }
}
