export interface AppImage {
  publicId: string;
  urlOriginal: string;
  urlSmall: string;
  categories: PhotoCategory[]
}

export interface GalleryItem {
  id: PhotoCategory;
  title: string;
  description: string;
  examples: AppImage[]
}

export enum PhotoCategory {
  'PORTRAITS' = 'portraits',
  'NATURE' = 'nature',
  'INTERIOR_ARCHITECTURE' = 'interiorArchitecture',
  'AUTOMOTIVE' = 'automotive',
  'CREATIVE_VISION' = 'creativeVision',
}
