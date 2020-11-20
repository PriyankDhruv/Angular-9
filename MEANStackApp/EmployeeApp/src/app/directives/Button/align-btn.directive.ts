import { Directive, ElementRef, OnInit, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appAlignBtn]'
})

export class AlignBtnDirective implements OnInit {
  @HostBinding('style.marginRight') marginRight: string = '2px';
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.renderer.setStyle(this.elementRef.nativeElement, 'margin-right', '2px');
  }
}