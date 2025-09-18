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
import { ImageService } from "../../services/image.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RecentImageCardComponent } from "../../components/recent-image-card/recent-image-card.component";
import { AppImage, AppImageMeasured, Language } from "../../app.models";
import { ImageSrcDirective } from "../../directives/imageSrc";
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  fromEvent, map,
  startWith,
  switchMap
} from "rxjs";
import { shuffleArray } from "../../utils/array/array.utils";
import { LanguageService } from "../../services/language.service";

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

  protected readonly igLink = 'https://www.instagram.com/zagatskiy_alex/';

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

  protected readonly aboutBgYOffset = computed<string>(() => {
    const maxScrollY = document?.body.scrollHeight;
    const offset = 30 * ((this.scrollY() * 4) / maxScrollY); // TODO: improve calculations for mobile
    return offset + '%';
  })

  protected readonly bannerTitleOpacity = computed<number>(() => {
    const opacity = 1 - (this.scrollY() / this.scrollOffset);
    return Math.min(opacity, 1);
  })

  private previewWidth = 300;

  bannerUrl = 'https://res.cloudinary.com/dix00u7dh/image/upload/v1755721458/E23CFB39-7087-4E85-8338-E5EBF8BB4820_1_201_a_tjpcso';
  bannerUrlSmall = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_600/v1755721458/E23CFB39-7087-4E85-8338-E5EBF8BB4820_1_201_a_tjpcso';
  aboutBgUrlSmall = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_800/1D369B56-DFCA-4387-9A45-5036FAFDA60F_1_105_c_h7xdvf';
  aboutImgUrlSmall = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_300/v1755721458/22C03700-A599-4EC9-883F-8CD570ABE932_1_201_a_yaubns';

  protected readonly aboutText = {
    [Language.EN]: `I am a web developer by profession, but photography has been with me since my youth — I started with film cameras, never imagining the possibilities that modern digital photography would bring. After a long break, I returned to photography in adult life, and now it is my passion and a way to see the world differently.</br>
    For me, photography is a hobby that has grown into a true passion. I am most inspired by shooting cars and motorcycles, as well as portrait photography, landscapes, and architecture. I enjoy experimenting with light and trying to capture the atmosphere of each moment.</br>
    If my vision speaks to you, I will be glad to connect, exchange ideas, or discuss possible cooperation. I am based in Warsaw, but always open to new contacts. You can also follow me on <a href="${this.igLink}">Instagram</a>, where I share my latest work.`,
    [Language.PL]: `Z zawodu jestem programistą stron internetowych, ale fotografia towarzyszy mi od młodości — zaczynałem od aparatów analogowych, nie wyobrażając sobie wtedy, jakie możliwości przyniesie współczesna fotografia cyfrowa. Po dłuższej przerwie wróciłem do zdjęć już w dorosłym życiu i dziś to moja pasja oraz sposób patrzenia na świat w wyjątkowy sposób.</br>
    Fotografia jest dla mnie hobby, które stało się prawdziwą pasją. Najbardziej inspiruje mnie fotografowanie samochodów i motocykli, a także portretów, krajobrazów i architektury. Lubię eksperymentować ze światłem i starać się uchwycić atmosferę każdej chwili.</br>
    Jeśli moje spojrzenie na fotografię jest Ci bliskie, chętnie nawiążę kontakt, porozmawiam o pomysłach lub możliwej współpracy. Mieszkam w Warszawie, ale zawsze jestem otwarty na nowe znajomości. Zapraszam także do obserwowania mojego <a href="${this.igLink}">Instagrama</a>, gdzie publikuję najnowsze zdjęcia.`,
    [Language.UK]: `Я веброзробник за професією, але фотографія супроводжує мене з юності — перші кадри я знімав ще на плівку, навіть не уявляючи, які можливості з’являться з розвитком сучасних цифрових камер. Після перерви я повернувся до фото вже у дорослому житті, і тепер це моє натхнення та спосіб бачити світ по-особливому.</br>
    Для мене фотографія — це хобі, яке стало справжньою пристрастю. Найбільше мене захоплює зйомка автомобілів і мотоциклів, а також портретна фотографія, пейзажі та архітектура. Я люблю експериментувати зі світлом і намагатися передати атмосферу моменту у кожному кадрі.</br>
    Якщо вам близьке моє бачення, буду радий спілкуванню, обговоренню ідей чи можливої співпраці. Я знаходжусь у Варшаві, але завжди відкритий до нових контактів. Також запрошую приєднуватися до мого <a href="${this.igLink}">Instagram</a>, де з’являються найсвіжіші роботи.`,
  }

  protected readonly languageService = inject(LanguageService);

  protected readonly supportedLanguages = this.languageService.supportedLanguages;
  protected readonly selectedLanguage = this.languageService.selectedLanguage;

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
