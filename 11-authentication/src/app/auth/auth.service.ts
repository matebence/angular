import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";

@Injectable()
export class AuthService {

    private accessToken: string | null = null;

    constructor(private http: HttpClient) { }

    signupUser(email: string, password: string) {
        return this.http.post("your-url/auth", { 'email': email, 'password': password });
    }

    signinUser(email: string, password: string) {
        return this.http.post<{ accessToken: string }>("your-url/login", { 'email': email, 'password': password }).pipe(
            map((data) => {
                return data.accessToken;
            }));
    }

    sigoutUser() {
        this.accessToken = null;
    }

    getToken(): string | null {
        return this.accessToken;
    }

    setToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    isAuthenticated(): boolean {
        return this.accessToken != null;
    }
}