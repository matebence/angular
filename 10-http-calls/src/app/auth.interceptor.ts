import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // We can then now here get our token
    // constructor(private authService: Authervice) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('From interceptor' + JSON.stringify(req));

        // Request are immutable, its because we dont want to add the authroization header 2x if the first HTTP request fails
        const copiedReq = req.clone({'headers': req.headers.append('Authorization', 'password')});

        // its forwarding the request
        return next.handle(req);
    }
}