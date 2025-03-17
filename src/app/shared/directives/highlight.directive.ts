import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlightRow('#f0f0f0');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlightRow('');
  }

  private highlightRow(color: string) {
    const rowCells = this.el.nativeElement.querySelectorAll('td');
    rowCells.forEach((cell: HTMLElement) => {
      cell.style.backgroundColor = color;
    });
  }
}
