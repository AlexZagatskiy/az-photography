import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  HostBinding,
  HostListener,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { NgClass } from "@angular/common";
import { ImageService } from "../../services/image.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RecentImageCardComponent } from "../../components/recent-image-card/recent-image-card.component";
import { AppImage, AppImageMeasured } from "../../app.models";
import { ImageSrcDirective } from "../../directives/imageSrc";
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  fromEvent, map,
  startWith,
  Subject,
  switchMap
} from "rxjs";
import { shuffleArray } from "../../utils/array/array.utils";

@Component({
  selector: 'app-home',
  imports: [
    ImageSrcDirective,
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


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.scrollY.set(window.scrollY);
  }

  protected readonly bannerBgUrl = '/img/banner-bg.jpeg'


  protected readonly recentImages = signal<AppImage[][]>([]);
  protected readonly scrollY = signal<number>(0)
  protected readonly scrollOffset = 200;

  protected readonly bannerPadding = computed<string>(() => {
    const minPadding = 24;
    const padding = this.scrollY() * (minPadding / this.scrollOffset);
    return Math.min(padding, minPadding) + 'px';
  })

  protected readonly bannerRadius = computed<string>(() => {
    const minRadius = 0.75;
    const radius = this.scrollY() * (minRadius / this.scrollOffset);
    return Math.min(radius, minRadius) + 'rem';
  })

  protected readonly bannerTitleOpacity = computed<number>(() => {
    const opacity = 1 - (this.scrollY() / this.scrollOffset);
    return Math.min(opacity, 1);
  })

  private previewWidth = 300;

  bannerUrl = 'https://res.cloudinary.com/dix00u7dh/image/upload/v1755721458/E23CFB39-7087-4E85-8338-E5EBF8BB4820_1_201_a_tjpcso'
  bannerUrlSmall = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_600/v1755721458/E23CFB39-7087-4E85-8338-E5EBF8BB4820_1_201_a_tjpcso'

  constructor() {
    afterNextRender(() => {
      combineLatest([
        this.imageService.getAllImages(this.previewWidth).pipe(
          switchMap(images => {
            return forkJoin(images.map(img => this.imageService.loadImageDimensions$(img)))
          })
        ),
        fromEvent(window, 'resize').pipe(
          startWith(0),
          debounceTime(400),
          map(() => Math.ceil(window.innerWidth / this.previewWidth)),
          distinctUntilChanged()
        )
      ])
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        ).subscribe(([imageList, columnsCount]) => {
        const grouped = this.balanceImagesByHeight(imageList, columnsCount);
        this.recentImages.set(grouped);
      })
    });
  }

  ngOnInit() {

  }

  private balanceImagesByHeight(images: AppImageMeasured[], columnCount: number): AppImageMeasured[][] {
    const columns = Array.from({length: columnCount}, () => ({
      items: [] as AppImageMeasured[],
      totalHeight: 0
    }));

    // Sort by height descending for better distribution
    const sortedImages = [...images].sort((a, b) => b.height - a.height);

    sortedImages.forEach(image => {
      const shortestColumn = columns.reduce((min, col, index) =>
        col.totalHeight < columns[min].totalHeight ? index : min, 0
      );

      columns[shortestColumn].items.push(image);
      columns[shortestColumn].totalHeight += image.height;
    });

    return columns.map(col => {
      shuffleArray(col.items);
      return col.items;
    });
  }
}
