import { Component, DestroyRef, HostBinding, inject } from '@angular/core';
import { ImageService } from "../../services/image.service";
import { NgClass } from "@angular/common";
import { AppImage, GalleryItem, PhotoCategory } from "../../app.models";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-gallery',
  imports: [
    NgClass
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  standalone: true
})
export class GalleryComponent {
  private readonly imageService = inject(ImageService);
  private readonly destroyRef = inject(DestroyRef);

  @HostBinding('class') hostClasses = 'min-h-screen block bg-black';

  protected readonly previewClassConfigs = [
    'w-8/12  absolute -top-20 -left-8 max-md:hidden',
    'w-6/12 z-4 relative top-10 left-4',
    'w-6/12 z-2 relative -top-14 right-4',
    'w-8/12 z-3 absolute -right-4 -bottom-20',
  ];

  protected readonly items: GalleryItem[] = [];

  private readonly visibleCategories = [
    PhotoCategory.AUTOMOTIVE,
    PhotoCategory.PORTRAITS,
    PhotoCategory.INTERIOR_ARCHITECTURE,
    PhotoCategory.NATURE,
    PhotoCategory.CREATIVE_VISION,
  ];

  private readonly categoryTitle: Record<PhotoCategory, string> = {
    [PhotoCategory.AUTOMOTIVE]: 'Automotive',
    [PhotoCategory.PORTRAITS]: 'Portraits',
    [PhotoCategory.INTERIOR_ARCHITECTURE]: 'Interior & Architecture',
    [PhotoCategory.NATURE]: 'Nature & Landscape',
    [PhotoCategory.CREATIVE_VISION]: 'Creative Vision',
  }
  private readonly categoryDescription: Record<PhotoCategory, string> = {
    [PhotoCategory.AUTOMOTIVE]: 'Capturing the beauty of machines in motion and stillness - from sleek details to full dramatic shots, each image highlights the design and character of every vehicle.',
    [PhotoCategory.PORTRAITS]: 'Authentic and expressive portraits that tell a story. My focus is on capturing personality, mood, and natural beauty in every frame.',
    [PhotoCategory.INTERIOR_ARCHITECTURE]: 'Showcasing the harmony of design, light, and space. I create images that bring out the elegance and atmosphere of architectural and interior environments.',
    [PhotoCategory.NATURE]: 'From sweeping vistas to intimate details, my landscapes highlight the colors, textures, and emotions of the natural world.',
    [PhotoCategory.CREATIVE_VISION]: 'From conceptual compositions to artistic experiments with light, color, and form, my creative vision work is about transforming ideas into striking visual stories.'
  }

  constructor() {
    this.loadImages();
  }

  private loadImages(): void {
    this.visibleCategories.forEach(category => {
      this.imageService.getImageUrlsByCategory(category, 4, 600).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(imageUrls => {
        this.items.push(this.createGalleryItem(category, imageUrls))
      })
    })
  }

  private createGalleryItem(category: PhotoCategory, examples: AppImage[]): GalleryItem {
    return {
      id: category,
      title: this.categoryTitle[category] ?? category,
      description: this.categoryDescription[category] ?? category,
      examples,
    }
  }
}
