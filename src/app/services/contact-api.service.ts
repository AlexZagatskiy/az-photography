import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ContactApiService {
  private readonly http = inject(HttpClient);

  public sendEmail(data: Record<string, any>): Observable<any> {
    const url = `https://az-photography.netlify.app/.netlify/functions/contact-form`;
    // const url = `https://az-photography.netlify.app/contact-form/warsaw`;
    return this.http.post(url, JSON.stringify(data));
  }

}
