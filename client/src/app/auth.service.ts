import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService
  ) {}

  isUserLoggedIn$ = new BehaviorSubject(!!this.cookieService.get('token'));

  login(data: Partial<{ username: string | null; password: string | null }>) {
    return this.http.post('http://localhost:3000/login', data);
  }

  register(
    data: Partial<{ username: string | null; password: string | null }>
  ) {
    return this.http.post('http://localhost:3000/register', data);
  }

  logout() {
    return this.http.post('http://localhost:3000/logout', {}).subscribe(() => {
      this.cookieService.delete('token');
      window.location.reload();
    });
  }
}
