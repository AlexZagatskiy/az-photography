import { Component, computed, DestroyRef, HostBinding, HostListener, inject, OnInit, signal } from '@angular/core';
import { NgClass } from "@angular/common";
import { ImageService } from "../../services/image.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Image } from "../../app.models";
import { RecentImageCardComponent } from "../../components/recent-image-card/recent-image-card.component";

@Component({
  selector: 'app-home',
  imports: [
    NgClass,
    RecentImageCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly imageService = inject(ImageService);
  @HostBinding('class') hostClasses = 'block bg-black';


  scrollOffset = 200;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.scrollY.set(window.scrollY);
  }

  protected readonly bannerBgUrl = '/img/banner-bg.jpeg'


  protected readonly recentImages = signal<Image[]>([])
  protected readonly scrollY = signal<number>(0)

  protected readonly bannerPadding = computed<string>(() => {
    const padding = this.scrollY() * 0.12;
    return Math.min(padding, 24) + 'px';
  })

  protected readonly bannerTitleOpacity = computed<number>(() => {
    const opacity = 1 - (this.scrollY() / 300);
    return Math.min(opacity, 1);
  })

  ngOnInit() {
    this.imageService.getAllImages().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(images => {
      this.recentImages.set(images);
    })
  }
}
