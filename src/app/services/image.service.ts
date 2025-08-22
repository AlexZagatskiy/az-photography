import { inject, Injectable } from "@angular/core";
import { AppImage } from "../app.models";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ImageService {
  private readonly http = inject(HttpClient)

  public getAllImages(): Observable<AppImage[]> {
    return this.http.get<AppImage[]>(`all-images.json`).pipe(
      map(images => images.map(image => ({
        ...image,
        url: this.getImageUrlByPublicId(image.publicId)
      })))
    )
  }

  private getImageUrlByPublicId(publicId: string): string {
    return `https://res.cloudinary.com/dix00u7dh/image/upload/v1755721458/${publicId}`
  }
}
