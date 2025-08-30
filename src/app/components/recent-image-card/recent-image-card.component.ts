import { Component, input } from '@angular/core';
import { AppImage } from "../../app.models";
import { ImageSrcDirective } from "../../directives/imageSrc";

@Component({
  selector: 'app-recent-image-card',
  imports: [
    ImageSrcDirective
  ],
  templateUrl: './recent-image-card.component.html',
  styleUrl: './recent-image-card.component.scss',
  standalone: true
})
export class RecentImageCardComponent {
  public image = input.required<AppImage>()
}
