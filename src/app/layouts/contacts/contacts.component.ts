import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";
import { ImageSrcDirective } from "../../directives/imageSrc";
import { ContactApiService } from "../../services/contact-api.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { finalize } from "rxjs";

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
  protected readonly mobilePhone = '+48572120264';
  protected readonly email = 'alexzagatskiy@gmail.com';
  protected readonly backgroundUrl = 'https://res.cloudinary.com/dix00u7dh/image/upload/FAF071BD-C1FA-43AF-83BD-6608E40E4B0F_1_201_a_zdsssk';
  protected readonly backgroundUrlSmall = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_600/FAF071BD-C1FA-43AF-83BD-6608E40E4B0F_1_201_a_zdsssk';

  protected readonly contactApiService = inject(ContactApiService);
  protected readonly destroyRef = inject(DestroyRef);

  protected readonly isFormSubmitting = signal(false);

  protected sendFormData(formValue: Record<string, any>) {
    console.log('submit', formValue)
    this.isFormSubmitting.set(true);
    this.contactApiService.sendEmail(formValue).pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => {
        this.isFormSubmitting.set(false);
      })
    ).subscribe(resp => {
      console.log('response', resp);
    })
  }
}
