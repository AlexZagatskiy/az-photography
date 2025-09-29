import { Directive, HostListener, output } from "@angular/core";

@Directive({
  selector: "[gestures]",
  standalone: true
})
export class GesturesDirective  {
  public readonly swipeLeft = output<void>();
  public readonly swipeRight = output<void>();
  public readonly swipeTop = output<void>();
  public readonly swipeBottom = output<void>();

  private startX = 0;
  private startY = 0;
  private startTime = 0;
  private readonly minSwipeDistance = 50; // minimum distance for swipe
  private readonly maxSwipeTime = 500; // maximum time in ms for a valid swipe

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.startTime = Date.now();
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const endTime = Date.now();

    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    const deltaTime = endTime - this.startTime;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if swipe was fast enough and distance is sufficient
    if (deltaTime <= this.maxSwipeTime &&
      (absDeltaX > this.minSwipeDistance || absDeltaY > this.minSwipeDistance)) {
      // Determine primary direction (horizontal vs vertical)
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          this.swipeRight.emit();
        } else {
          this.swipeLeft.emit();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          this.swipeBottom.emit();
        } else {
          this.swipeTop.emit();
        }
      }
    }
  }
}
