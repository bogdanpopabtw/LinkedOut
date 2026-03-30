import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthFacade } from "../../store/auth/auth.facade";
import { environment } from "../../../environments/environment";
import { Observable, tap } from "rxjs";
import { jwtDecode } from 'jwt-decode';
import { LoginRequest, LoginResponse, RegisterRequest, JwtPayload } from "../models/auth.models";

const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly authFacade = inject(AuthFacade);
  private readonly base = `${environment.baseURL}/auth`;

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    } catch {
      return false;
    }
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub;
    } catch {
      return null;
    }
  }

  loadUserFromToken(): void {
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.authFacade.loadUser(userId);
    }
  }

  persistToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
    this.loadUserFromToken();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, credentials).pipe(
      tap((response) => {
      this.persistToken(response.accessToken);
    }),
    );
  }

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.base}/register`, data);
  }

  logout(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    this.authFacade.logout();
    this.router.navigate(['/login']);
  }
}