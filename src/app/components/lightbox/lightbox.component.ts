import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LightboxService } from "../../services/lightbox.service";
import { ImageSrcDirective } from "../../directives/image-src";
import { NgClass } from "@angular/common";
import { GesturesDirective } from "../../directives/gestures";
import { KeyboardNavigationDirective } from "../../directives/keyboard-navigation";

@Component({
  selector: 'app-lightbox',
  imports: [
    ImageSrcDirective,
    NgClass,
    GesturesDirective,
    KeyboardNavigationDirective
  ],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LightboxComponent {
  private readonly lightboxService = inject(LightboxService);

  protected activeImage = this.lightboxService.activeImage;

  protected showNext(): void {
    this.lightboxService.showNext();
  }

  protected showPrevious(): void {
    this.lightboxService.showPrevious();
  }

  protected closeLightBox(): void {
    this.lightboxService.closeLightBox();
  }
}
