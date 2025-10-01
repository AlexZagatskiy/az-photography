import { ChangeDetectionStrategy, Component, HostBinding, input, output, signal } from '@angular/core';
import { AppImage, PhotoCategory } from "../../app.models";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-recent-image-card',
  imports: [
    NgClass
  ],
  templateUrl: './recent-image-card.component.html',
  styleUrl: './recent-image-card.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentImageCardComponent {
  @HostBinding('class') hostClasses = 'block rounded-xl overflow-hidden';

  public image = input.required<AppImage>();
  public showInLightBox = output<void>();
  public navigateToCategory = output<PhotoCategory>();

  protected readonly isActive = signal(false);

  protected toggleOverlay(): void {
    this.isActive.update(isActive => !isActive);
  }
}
