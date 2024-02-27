import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements: any = [{type: "server", name: "Test", content: "Test"}];

  // Custom event binding, like with (input)="myEvent(event)"  
  onServerAdded(serverData: {serverName: string, serverContent: string}) {
      this.serverElements.push({
        type: 'server',
        name: serverData.serverName,
        content: serverData.serverContent
      });
  }

  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }
}
