import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

    @Input() defaultColor: string = 'transparent';
    @Input() hihglightColor: string = 'blue';

    // This here replaces the renderer useage in the constructor
    @HostBinding('style.backgroundColor') backgroundColor: string | undefined;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.backgroundColor = this.defaultColor;
        // this.backgroundColor = 'blue'
        // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    }

    @HostListener('mouseenter') mouseenter(eventData: Event) {
        this.backgroundColor = this.hihglightColor;
        // this.backgroundColor = 'yellow';
        // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');
    }

    
    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.backgroundColor = this.defaultColor;
        // this.backgroundColor = 'pink';
        // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'pink');
    }
}