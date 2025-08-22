import { Directive, ElementRef, inject, input, OnInit } from "@angular/core";

@Directive({
  selector: "[imgSrc]",
  standalone: true
})
export class ImageSrcDirective implements OnInit {
  private elementRef = inject(ElementRef);
  public readonly imgSrc = input.required<string>();

  ngOnInit() {
    const img = new Image();
    img.onload = () => {
      this.elementRef.nativeElement.src = this.imgSrc();
    }
    img.src = this.imgSrc();
  }
}
