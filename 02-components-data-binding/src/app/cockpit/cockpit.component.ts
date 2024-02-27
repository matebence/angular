import { Component, ContentChild, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrl: './cockpit.component.css'
})
export class CockpitComponent {

  @Output('srCreated')
  serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  
  @Output('bpCreated')
  blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

  // We use references
  // newServerName = '';
  // newServerContent = '';

  @ViewChild('contentInput') contentInput: ElementRef;

  // If its in ng-content
  // @ContentChild('contentInput') contentInput: ElementRef;

  onAddServer(nameInput: any) {
    console.log(nameInput);
    console.log(nameInput.value);
    this.serverCreated.emit({serverName: nameInput.value, serverContent: this.contentInput.nativeElement.value})
  }

  onAddBlueprint(nameInput: any) {
    // this.blueprintCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent})
    console.log(this.contentInput);
    this.blueprintCreated.emit({serverName: nameInput.value, serverContent: this.contentInput.nativeElement.value})
  }
}
