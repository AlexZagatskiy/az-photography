import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LightboxService } from "../../services/lightbox.service";
import { ImageSrcDirective } from "../../directives/imageSrc";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-lightbox',
  imports: [
    ImageSrcDirective,
    NgClass
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

  protected closeLightBox(): void {
    this.lightboxService.closeLightBox();
  }
}
