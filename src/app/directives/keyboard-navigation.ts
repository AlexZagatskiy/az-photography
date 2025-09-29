import { Directive, HostListener, output } from "@angular/core";

@Directive({
  selector: "[keyboardNavigation]",
  standalone: true
})
export class KeyboardNavigationDirective {
  public readonly arrowLeft = output<void>();
  public readonly arrowRight = output<void>();
  public readonly escape = output<void>();

  @HostListener('window:keydown', ['$event'])
  onTouchStart(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' || event.code === 'ArrowLeft') {
      this.arrowLeft.emit();
      return;
    }
    if (event.key === 'ArrowRight' || event.code === 'ArrowRight') {
      this.arrowRight.emit();
      return;
    }
    if (event.key === 'Escape' || event.code === 'Escape') {
      this.escape.emit();
      return;
    }
  }

}
