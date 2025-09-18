import { Component, computed, ElementRef, inject, input, output, signal, viewChild } from "@angular/core";
import { Language } from "../../app.models";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgClass } from "@angular/common";

interface LanguageOption {
  code: Language;
  label: string;
  flag: SafeHtml; // SVG string
  ariaLabel: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  protected sanitizer = inject(DomSanitizer);
  public readonly supportedLanguages = input.required<Language[]>();
  public readonly selectedLanguage = input.required<Language>();

  public readonly languageChanged = output<Language>();

  public readonly isDropdownOpen = signal<boolean>(false);

  protected readonly languageOptions = computed(() => {
    return this.supportedLanguages().map(lang => this.getLanguageOption(lang));
  });

  protected readonly currentLanguageLabel = computed(() => {
    const current = this.getLanguageOption(this.selectedLanguage());
    return current.label;
  });

  protected readonly currentFlag = computed(() => {
    const current = this.getLanguageOption(this.selectedLanguage());
    return current.flag;
  });

  private getLanguageOption(language: Language): LanguageOption {
    const options: Record<Language, LanguageOption> = {
      [Language.EN]: {
        code: Language.EN,
        label: 'English',
        ariaLabel: 'Select English',
        flag: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 640 480" class="w-full h-full">
          <defs><clipPath id="a"><path fill-opacity=".7" d="M-85.3 0h682.6v512H-85.3z"/></clipPath></defs>
          <g clip-path="url(#a)" transform="translate(80) scale(.94)">
            <g stroke-width="1pt">
              <path fill="#012169" d="M-256 0H768v512H-256z"/>
              <path fill="#fff" d="m-256 0 512 512m0-512L-256 512"/>
              <path fill="#c8102e" d="m-256 0 512 512M768 0L-256 512" stroke-width=".7"/>
              <path fill="#fff" d="M-256 213.3h1024V298.7H-256z"/>
              <path fill="#c8102e" d="M-256 240h1024v32H-256z"/>
              <path fill="#fff" d="M213.3-256v1024H298.7V-256z"/>
              <path fill="#c8102e" d="M240-256v1024h32V-256z"/>
            </g>
          </g>
        </svg>`)
      },
      [Language.PL]: {
        code: Language.PL,
        label: 'Polski',
        ariaLabel: 'Wybierz język polski',
        flag: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 640 480" class="w-full h-full">
          <g fill-rule="evenodd">
            <path fill="#fff" d="M640 480H0V0h640z"/>
            <path fill="#dc143c" d="M640 480H0V240h640z"/>
          </g>
        </svg>`)
      },
      [Language.UK]: {
        code: Language.UK,
        label: 'Українська',
        ariaLabel: 'Оберіть українську мову',
        flag: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 640 480" class="w-full h-full">
          <g fill-rule="evenodd" stroke-width="1pt">
            <path fill="#005bbb" d="M0 0h640v480H0z"/>
            <path fill="#ffd500" d="M0 0h640v240H0z"/>
          </g>
        </svg>`)
      }
    };

    return options[language];
  }

  protected onLanguageChange(languageCode: Language): void {
    if (languageCode !== this.selectedLanguage()) {
      this.languageChanged.emit(languageCode);
    }
    setTimeout(() => this.toggleSelectDropdown(), 100)
  }

  protected toggleSelectDropdown(): void {
    this.isDropdownOpen.update(isOpen => !isOpen)
  }
}
