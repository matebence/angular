import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {

    // When we put private, protected or public before the constructor argument, it means thats a class attribute too
    constructor(private elementRef: ElementRef) {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }

    ngOnInit(): void {
    }
}
