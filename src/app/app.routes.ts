import { Routes } from '@angular/router';
import { HomeComponent } from "./layouts/home/home.component";
import { ContactsComponent } from "./layouts/contacts/contacts.component";
import { GalleryComponent } from "./layouts/gallery/gallery.component";
import { CommercialComponent } from "./layouts/commercial/commercial.component";

export enum APP_ROUTES {
  HOME = 'home',
  CONTACTS = 'contacts',
  GALLERY = 'gallery',
  COMMERCIALS = 'commercials',
}

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: APP_ROUTES.CONTACTS,
    component: ContactsComponent,
  },
  {
    path: APP_ROUTES.GALLERY,
    component: GalleryComponent,
  },
  {
    path: APP_ROUTES.COMMERCIALS,
    component: CommercialComponent,
  },
  {
    path: APP_ROUTES.HOME,
    redirectTo: ''
  },
  {
    path: '**',
    redirectTo: APP_ROUTES.HOME,
  }
];
