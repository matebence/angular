import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export interface CanComponentDeacivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const CanDeactivateGuard: CanDeactivateFn<CanComponentDeacivate> = (component: CanComponentDeacivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    return component.canDeactivate();
}
