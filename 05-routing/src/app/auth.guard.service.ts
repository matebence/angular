import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const router: Router = inject(Router);
    const userRole: String = inject(AuthService).getUserRole();

    const expectedRoles: String[] = ["USER"]
    const hasRole: boolean = expectedRoles.some((role) => userRole === role);
  
    return hasRole || router.navigate(['/']);
}

export const AuthGuardChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    return AuthGuard(route, state);
}
