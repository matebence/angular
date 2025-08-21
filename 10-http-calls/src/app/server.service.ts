import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable()
export class ServerService {
    constructor(private http: HttpClient) { }

    storeServers(servers: any[]) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.post('https://dummyjson.com/test', servers, { headers });
    }

    getServers() {
        return this.http.get('https://dummyjson.com/ip');
    }

    getServersTransformed(): Observable<{ ip: string; userAgent: string }> {
        return this.http.get<{ ip: string; userAgent: string }>('https://dummyjson.com/ip').pipe(
            map((data) => {
                return {
                    ip: data.ip,
                    userAgent: data.userAgent
                };
            }),
            catchError((error) => {
                console.error('Error fetching IP:', error);
                return throwError(() => new Error('Failed to fetch IP data.'));
            })
        );
    }

    getUserAgent(): Observable<string> {
        return this.http.get<{ ip: string; userAgent: string }>('https://dummyjson.com/ip').pipe(
            map((data) => {
                return data.userAgent;
            }),
            catchError((error) => {
                console.error('Error fetching IP:', error);
                return throwError(() => new Error('Failed to fetch IP data.'));
            })
        );
    }

    updateServers(servers: any[]) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.put('https://dummyjson.com/test', servers, { headers });
    }
}