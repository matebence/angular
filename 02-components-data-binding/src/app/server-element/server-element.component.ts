import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css', // these styles are only applied for this component
  encapsulation: ViewEncapsulation.None // the css styles defined for this component will be used globally
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  // Property binding like [disabled] = true
  // @Input('srvElement')
  @Input() element: {type: string, name: string, content: string};

  constructor() {
    console.log('Constructor called');
  }

  ngOnInit(): void {
    console.log('OnInit called');
  }

  ngOnChanges(changes: SimpleChanges): void { // the attribute contains the new and old value
    console.log(changes); // we will se here our bounded property 'element'
    console.log('OnChanges called');
  }

  ngDoCheck(): void {
    console.log("onDoCheck called");
  }

  ngAfterContentInit(): void {
    console.log("onAfterContentInit called");
  }

  ngAfterContentChecked(): void {
    console.log("onAfterContentChecked called");
  }

  ngAfterViewInit(): void {
    console.log("onAfterViewInit called");
  }

  ngAfterViewChecked(): void {
    console.log("onAfterViewChecked called");    
  }

  ngOnDestroy(): void {
    console.log("onDestroy called");        
  }
}
