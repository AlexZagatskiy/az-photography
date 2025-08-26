import { Component, HostBinding } from '@angular/core';
import { RouterLink, ROUTES } from "@angular/router";
import { APP_ROUTES } from "../../app.routes";

@Component({
  selector: 'app-navigation',
  imports: [
    RouterLink
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true
})
export class NavigationComponent {
  @HostBinding('class') hostClasses = 'fixed left-0 top-0 right-0 z-10 bg-white/40 backdrop-blur-md';

  protected readonly igLink = 'https://www.instagram.com/zagatskiy_alex/';
  protected readonly navLinks = [
    APP_ROUTES.HOME,
    APP_ROUTES.GALLERY,
    APP_ROUTES.CONTACTS,
  ]
}
