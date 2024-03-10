import { Component, OnDestroy, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CanComponentDeacivate } from './deactivate.guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnDestroy, CanComponentDeacivate {
  paramsSubscription: Subscription | undefined;
  querySubscription: Subscription | undefined;
  
  server!: { id: number; name: string; status: string; };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.allowEdit) {
      return true;
    }
    if (this.serverName !== this.server.name || this.serverStatus !== this.server.status) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id'])!;
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });

    this.querySubscription = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit']=== '1' ? true : false
      }
    )
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../', {relativeTo: this.route}])
  }

  ngOnDestroy(): void {
     this.paramsSubscription!.unsubscribe();
     this.querySubscription!.unsubscribe
  }
}
