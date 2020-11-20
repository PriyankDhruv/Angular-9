import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlignLogo]'
})

export class AlignLogoDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'flex', '1 1 auto');
    this.renderer.setStyle(this.elementRef.nativeElement, 'text-align', 'center');
  }
}