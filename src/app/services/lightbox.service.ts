import { computed, inject, Injectable, signal } from "@angular/core";
import { AppImage, AppImageMeasured, PhotoCategory } from "../app.models";
import { flatMap, forkJoin, map, Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LightboxService {
  // private readonly _activeImage = signal<AppImage | null>(null);
  private readonly _activeImageIndex = signal<number | null>(null);
  private readonly _imageList = signal<AppImage[]>([]);

  // public readonly activeImageIndex = this._activeImageIndex.asReadonly();
  public readonly activeImage = computed<AppImage | null>(() => {
    // if (this._activeImage()) {
    //   return this._activeImage();
    // }
    const imageIndex = this._activeImageIndex();
    const imageList = this._imageList();
    if (imageIndex === null || imageIndex > imageList.length) {
      return null;
    }
    return imageList[imageIndex];
  });

  public setActiveImage(image: AppImage): void {
    // this._activeImage.set(image);
    const i = this._imageList().findIndex(imageInList => imageInList.publicId === image.publicId);
    if (i !== -1) {
      this.setActiveImageIndex(i);
    }
  }

  public setActiveImageIndex(index: number): void {
    this._activeImageIndex.set(index);
  }

  public setImageList(imageList: AppImage[]): void {
    this._imageList.set(imageList);
  }

  public showNext(): void {
    this._activeImageIndex.update(i => {
      const newIndex = ++i!;
      return newIndex < this._imageList().length ? newIndex : 0;
    });
  }

  public showPrevious(): void {
    this._activeImageIndex.update(i => {
      const newIndex = --i!;
      return newIndex >= 0 ? newIndex : this._imageList().length - 1;
    });
  }

  public closeLightBox(): void {
    this._activeImageIndex.set(null);
  }

}
