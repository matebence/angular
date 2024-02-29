import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  // Its a setter method for the unless attribute
  // It gets called always the value changes - like in JSF
  @Input() set appUnless(value: boolean) {
    if (!value) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  // TemplateRef - what to render
  // ViewContainerRef - where to render
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {
  }
}
