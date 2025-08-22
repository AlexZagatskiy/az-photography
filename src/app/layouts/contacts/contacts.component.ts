import { Component } from '@angular/core';
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";
import { ImageSrcDirective } from "../../directives/imageSrc";

@Component({
  selector: 'app-contacts',
  imports: [
    ContactFormComponent,
    ImageSrcDirective
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  standalone: true
})
export class ContactsComponent {
  protected readonly backgroundUrl = 'https://res.cloudinary.com/dix00u7dh/image/upload/FAF071BD-C1FA-43AF-83BD-6608E40E4B0F_1_201_a_zdsssk';
  protected readonly backgroundUrlSmall = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_600/FAF071BD-C1FA-43AF-83BD-6608E40E4B0F_1_201_a_zdsssk';
}
