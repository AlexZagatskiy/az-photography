import { Component, computed, DestroyRef, HostBinding, HostListener, inject, OnInit, signal } from '@angular/core';
import { NgClass } from "@angular/common";
import { ImageService } from "../../services/image.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RecentImageCardComponent } from "../../components/recent-image-card/recent-image-card.component";
import { AppImage } from "../../app.models";
import { ImageSrcDirective } from "../../directives/imageSrc";

@Component({
  selector: 'app-home',
  imports: [
    NgClass,
    RecentImageCardComponent,
    ImageSrcDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly imageService = inject(ImageService);
  @HostBinding('class') hostClasses = 'block bg-black';


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.scrollY.set(window.scrollY);
  }

  protected readonly bannerBgUrl = '/img/banner-bg.jpeg'


  protected readonly recentImages = signal<AppImage[]>([])
  protected readonly scrollY = signal<number>(0)
  protected readonly scrollOffset = 200;

  protected readonly bannerPadding = computed<string>(() => {
    const minPadding = 24;
    const padding = this.scrollY() * (minPadding / this.scrollOffset);
    return Math.min(padding, minPadding) + 'px';
  })

  protected readonly bannerRadius = computed<string>(() => {
    const minRadius = 0.75;
    const radius = this.scrollY() * (minRadius/this.scrollOffset);
    return Math.min(radius, minRadius) + 'rem';
  })

  protected readonly bannerTitleOpacity = computed<number>(() => {
    const opacity = 1 - (this.scrollY() / this.scrollOffset);
    return Math.min(opacity, 1);
  })

  bannerUrl = 'https://res.cloudinary.com/dix00u7dh/image/upload/v1755721458/E23CFB39-7087-4E85-8338-E5EBF8BB4820_1_201_a_tjpcso'
  bannerUrlMedium = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_1000/v1755721458/E23CFB39-7087-4E85-8338-E5EBF8BB4820_1_201_a_tjpcso'
  // bannerUrlMedium = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_1000/v1755721458/3FB6A3AC-E23F-4B42-AF51-95334302860E_1_201_a_aeiqt7'
  bannerUrlSmall = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_600/v1755721458/E23CFB39-7087-4E85-8338-E5EBF8BB4820_1_201_a_tjpcso'
  // bannerUrlSmall = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_600/v1755721458/3FB6A3AC-E23F-4B42-AF51-95334302860E_1_201_a_aeiqt7'
  bannerUrlDynamic = this.bannerUrlSmall;


  ngOnInit() {
    this.imageService.getAllImages().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(images => {
      this.recentImages.set(images);
    })
  }
}
