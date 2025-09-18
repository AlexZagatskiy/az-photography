import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./components/navigation/navigation.component";
import { ImageService } from "./services/image.service";
import { FooterComponent } from "./components/footer/footer.component";
import { LanguageService } from "./services/language.service";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavigationComponent, FooterComponent],
    providers: [ImageService, LanguageService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true
})
export class AppComponent {
  protected readonly languageService = inject(LanguageService);

  title = 'az-photography';
}
