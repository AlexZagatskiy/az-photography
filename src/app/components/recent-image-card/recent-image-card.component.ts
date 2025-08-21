import { Component, input } from '@angular/core';
import { Image } from "../../app.models";

@Component({
  selector: 'app-recent-image-card',
  imports: [],
  templateUrl: './recent-image-card.component.html',
  styleUrl: './recent-image-card.component.scss',
  standalone: true
})
export class RecentImageCardComponent {
  public image = input.required<Image>()
}
