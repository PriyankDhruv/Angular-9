import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlignList]'
})

export class AlignListDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'margin-left', '1%');
    this.renderer.setStyle(this.elementRef.nativeElement, 'margin-right', '1%');
  }
}
