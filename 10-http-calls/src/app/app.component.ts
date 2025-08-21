import { Component } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  userAgent = this.serverService.getUserAgent();

  constructor(private serverService: ServerService) {}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  
  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  onSave() {
    this.serverService.storeServers(this.servers)
    .subscribe((response) => {
      console.log(response);
    });
  }

  onGet() {
    this.serverService.getServers().subscribe({
      next: (data) => {
        console.log(data); // Its already a parsed JSON
      },
      error: (error) => {
        console.log('Error:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });

    this.serverService.getServersTransformed().subscribe({
      next: (data) => {
        console.log(data); // Its already a parsed JSON
      },
      error: (error) => { // Catching Http Errors
        console.log('Error:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }
}
