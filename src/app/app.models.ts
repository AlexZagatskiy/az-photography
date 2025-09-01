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

export const MAX_INPUT_TEXT_LENGTH = 40;
export const MAX_TEXTAREA_LENGTH = 200;
