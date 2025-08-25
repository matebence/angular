import { Injectable } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class CustomService {
    constructor(private auth: AuthService, private http: HttpClient) {};

    retrieveData() {
        const accessToken: string | null = this.auth.getToken();
        const headers = new HttpHeaders({ 'Authentication': 'Bearer ' + accessToken })
        return this.http.get('your-data-url', {headers});
    }
}