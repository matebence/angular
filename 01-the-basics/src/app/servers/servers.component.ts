import { Component } from '@angular/core';

@Component({
  selector: 'app-servers', //tag selector
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css'
})
export class ServersComponent {

  // Property binding
  allowNewServer : boolean = true;
  serverName : String = '';
  serverNameTwo : String = '';
  servers : String[] = ['Testserver 1', 'Testserver 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = false;
    }, 3000)
  }

  // Event binding
  onCreateServer() : void {
    this.servers.push(this.serverNameTwo);
    this.allowNewServer = true;
  }

  // Event binding with data
  onUpdateServerName(event: any) : void {
    console.log(event);
    this.serverName = event.target.value;
  }
}
