import { Directive, Input, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input() rowHeadline?: string;

  @HostBinding('style.backgroundColor') backgroundColor = '';

  private includesAngular = false;

  ngOnInit(): void {
    this.hoverRowColor();
  }

  @HostListener('mouseenter') onMouseEnter() {
    if(this.includesAngular) {
      this.backgroundColor = 'skyblue';
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = '';
  }

  private hoverRowColor(): void {
    this.includesAngular = this.rowHeadline?.toLowerCase().includes('angular') ?? false;
  }
}
