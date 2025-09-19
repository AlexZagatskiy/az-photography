import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { ImageService } from "./services/image.service";
import { FooterComponent } from "./components/footer/footer.component";
import { LanguageService } from "./services/language.service";
import { LightboxService } from "./services/lightbox.service";
import { LightboxComponent } from "./components/lightbox/lightbox.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, FooterComponent, LightboxComponent],
  providers: [ImageService, LanguageService, LightboxService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly languageService = inject(LanguageService);

  title = 'az-photography';
}
