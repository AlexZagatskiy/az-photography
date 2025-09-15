import { inject, Injectable } from "@angular/core";
import { AppImage, AppImageMeasured, PhotoCategory } from "../app.models";
import { flatMap, forkJoin, map, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ImageService {
  private readonly http = inject(HttpClient)

  public getAllImages(imgWidth: number): Observable<AppImage[]> {
    const allCategories = [
      PhotoCategory.AUTOMOTIVE,
      PhotoCategory.PORTRAITS,
      PhotoCategory.INTERIOR_ARCHITECTURE,
      PhotoCategory.NATURE,
      PhotoCategory.CREATIVE_VISION,
    ];
    return forkJoin(allCategories.map(categoryId => this.getImageUrlsByCategory(categoryId, null, imgWidth))).pipe(
      map(examples => [...new Map(examples.flat().map(obj => [obj.publicId, obj])).values()])
    )
  }

  public loadImageDimensions$(imageData: AppImage): Observable<AppImageMeasured> {
    const imgObserver = new Subject<AppImageMeasured>();
    const img = new Image();

    img.onload = () => {
      imgObserver.next({
        ...imageData,
        height: img.naturalHeight
      });
      imgObserver.complete();
    };

    img.onerror = () => {
      // TODO: handle error
    };

    img.src = imageData.urlSmall;
    return imgObserver;
  }

  public getImageUrlsByCategory(category: PhotoCategory, offset: number | null, imgWidth?: number): Observable<AppImage[]> {
    return this.http.get<string[]>(`photos_${category}.json`).pipe(
      map(items => offset ? items.slice(0, offset) : items),
      map(items => items.map(publicId => ({
        publicId,
        urlOriginal: this.getImageUrlByPublicId(publicId),
        urlSmall: this.getImageUrlByPublicId(publicId, imgWidth),
        categories: [category]
      }))),
    )
  }

  private getImageUrlByPublicId(publicId: string, size?: number): string {
    const width = size ? `/w_${size}` : ''
    return `https://res.cloudinary.com/dix00u7dh/image/upload${width}/v1755721458/${publicId}`
  }
}
