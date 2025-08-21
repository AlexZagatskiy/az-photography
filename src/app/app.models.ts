export interface Image {
  publicId: string;
  url: string;
  tags: ImageTag[]
}

export enum ImageTag {
  '',
  'nature',
  'landscape',
  'moto'
}
