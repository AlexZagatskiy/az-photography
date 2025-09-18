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
        flag: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480">
          <path fill="#012169" d="M0 0h640v480H0z"/>
          <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/>
          <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/>
          <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/>
          <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/>
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
            <path fill="#ffd500" d="M0 0h640v480H0z"/>
            <path fill="#005bbb" d="M0 0h640v240H0z"/>
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
