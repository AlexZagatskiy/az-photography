import { Component, HostBinding } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-home',
  imports: [
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {
  @HostBinding('class') hostClasses = 'block bg-black';

  protected readonly bannerBgUrl = '/img/banner-bg.jpeg'
}
