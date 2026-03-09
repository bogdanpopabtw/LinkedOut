import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appRandomColor]'
})
export class RandomColorDirective {
  private elementRef = inject(ElementRef);
  private colors = ["royalblue", "magenta", "orange", "yellow", "lightgreen", "skyblue", "crimson"];

  ngOnInit():void {
    this.randomColors();
  }

  private randomColors(): void {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    const randomColor = this.colors[randomIndex];

    this.elementRef.nativeElement.style.backgroundColor = randomColor;
  }
}
