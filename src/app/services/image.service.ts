import { inject, Injectable } from "@angular/core";
import { AppImage, PhotoCategory } from "../app.models";
import { flatMap, forkJoin, map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ImageService {
  private readonly http = inject(HttpClient)

  public getAllImages(): Observable<AppImage[]> {
    const allCategories = [
      PhotoCategory.AUTOMOTIVE,
      PhotoCategory.PORTRAITS,
      PhotoCategory.INTERIOR_ARCHITECTURE,
      PhotoCategory.NATURE,
      PhotoCategory.CREATIVE_VISION,
    ];
    return forkJoin(allCategories.map(categoryId => this.getImageUrlsByCategory(categoryId, null))).pipe(
      map(examples => examples.flat())
    )
  }

  public getImageUrlsByCategory(category: PhotoCategory, offset: number | null, size?: number): Observable<AppImage[]> {
    return this.http.get<string[]>(`photos_${category}.json`).pipe(
      map(items => offset ? items.slice(0, offset) : items),
      map(items => items.map(publicId => ({
        publicId,
        urlOriginal: this.getImageUrlByPublicId(publicId),
        urlSmall: this.getImageUrlByPublicId(publicId, size),
        categories: [category]
      }))),
    )
  }

  private getImageUrlByPublicId(publicId: string, size?: number): string {
    const width = size ? `/w_${size}` : ''
    return `https://res.cloudinary.com/dix00u7dh/image/upload${width}/v1755721458/${publicId}`
  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  public shuffleArray<T>(array: T[]): void {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}
