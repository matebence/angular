import { Component } from '@angular/core';

@Component({
  selector: '.app-server', //class selector
  template: `
    <p [ngStyle]="{backgroundColor: getColor()}"
       [ngClass]="{online: serverStatus==='online'}">
       Server with id {{serverId}} is {{getServerStatus()}}.
    </p>
  `,
  styles: `
    p {
      font-weight: bold;
    }
    .online {
      color: white;
    }
  `
})
export class ServerComponent {
  // String interpolation
  serverId: number = 10;
  serverStatus: String = 'offline';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() : String {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';  
  }
}
