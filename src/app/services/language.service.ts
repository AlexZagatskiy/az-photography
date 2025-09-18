import { Injectable, signal } from "@angular/core";
import { Language } from "../app.models";

@Injectable()
export class LanguageService {
  public readonly supportedLanguages = [Language.EN, Language.PL, Language.UK];
  public readonly selectedLanguage = signal(Language.EN);

  public setLanguage(language: Language): void {
    this.selectedLanguage.set(language);
  }
}
