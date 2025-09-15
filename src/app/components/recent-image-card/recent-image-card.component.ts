import { Component, HostBinding, input } from '@angular/core';
import { AppImage  } from "../../app.models";

@Component({
  selector: 'app-recent-image-card',
  imports: [
  ],
  templateUrl: './recent-image-card.component.html',
  styleUrl: './recent-image-card.component.scss',
  standalone: true
})
export class RecentImageCardComponent {
  @HostBinding('class') hostClasses = 'block rounded-xl overflow-hidden';

  public image = input.required<AppImage>()
}
