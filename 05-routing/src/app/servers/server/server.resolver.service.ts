import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ServersService } from "../servers.service";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

interface Server {
    id: number,
    name: string,
    status: string
}

export const ServerResolver: ResolveFn<Server> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server => {
    const serverService: ServersService = inject(ServersService);

    return serverService.getServer(+route.params['id'])
}
