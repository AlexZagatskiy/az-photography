import { Directive, effect, ElementRef, inject, input, OnInit } from "@angular/core";

@Directive({
  selector: "[imgSrc]",
  standalone: true
})
export class ImageSrcDirective  {
  private elementRef = inject(ElementRef);
  public readonly imgSrc = input.required<string>();

  constructor() {
    effect(() => {
      const imgSrc = this.imgSrc();
      if (!imgSrc) {
        return;
      }
      const img = new Image();
      img.onload = () => {
        this.elementRef.nativeElement.src = imgSrc;
      }
      img.src = imgSrc;
    });
  }
}
