import { Component, OnDestroy, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string} | undefined;
  paramsSubscription: Subscription | undefined;
  
  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  onEdit(): void {
    // With preserve the query params will be pass to the next route
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        console.log(data);
      }
    )

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        //  We convert to number via the + symbol
        this.server = this.serversService.getServer(+params['id']);
      }
    )
  }

  ngOnDestroy(): void {
    this.paramsSubscription!.unsubscribe();
  }
}
