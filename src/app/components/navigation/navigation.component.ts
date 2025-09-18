import { Component, HostBinding, input, output } from '@angular/core';
import { RouterLink, ROUTES } from "@angular/router";
import { APP_ROUTES } from "../../app.routes";
import { LanguageSelectorComponent } from "../language-selector/language-selector.component";
import { Language } from "../../app.models";

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink,
    LanguageSelectorComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true
})
export class NavigationComponent {
  @HostBinding('class') hostClasses = 'fixed left-0 top-0 right-0 z-10 bg-white/40 backdrop-blur-md';
  public readonly supportedLanguages = input.required<Language[]>();
  public readonly selectedLanguage = input.required<Language>();

  public readonly languageChanged = output<Language>();

  protected readonly igLink = 'https://www.instagram.com/zagatskiy_alex/'; // TODO: move link to env
  protected readonly navLinks = [
    APP_ROUTES.HOME,
    APP_ROUTES.GALLERY,
    APP_ROUTES.CONTACTS,
  ]
}
