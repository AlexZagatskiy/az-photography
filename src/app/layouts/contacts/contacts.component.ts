import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { ContactFormComponent } from "../../components/contact-form/contact-form.component";
import { ImageSrcDirective } from "../../directives/imageSrc";
import { ContactApiService } from "../../services/contact-api.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { BehaviorSubject, catchError, map, Subject, tap } from "rxjs";
import { FormSubmitStatus } from "../../app.models";

@Component({
  selector: 'app-contacts',
  imports: [
    ContactFormComponent,
    ImageSrcDirective
  ],
  providers: [ContactApiService],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  standalone: true
})
export class ContactsComponent {
  protected readonly backgroundUrl = 'https://res.cloudinary.com/dix00u7dh/image/upload/FAF071BD-C1FA-43AF-83BD-6608E40E4B0F_1_201_a_zdsssk';
  protected readonly backgroundUrlSmall = 'https://res.cloudinary.com/dix00u7dh/image/upload/w_600/FAF071BD-C1FA-43AF-83BD-6608E40E4B0F_1_201_a_zdsssk';

  protected readonly contactApiService = inject(ContactApiService);
  protected readonly destroyRef = inject(DestroyRef);

  protected readonly formSubmitStatus = signal<FormSubmitStatus>(FormSubmitStatus.IDLE);

  protected readonly feedbackMessage = computed<string | null>(() => {
    return this.formSubmitStatus() === FormSubmitStatus.SUCCESS ?
      'Got it! Your form has been submitted successfully.' : this.formSubmitStatus() === FormSubmitStatus.ERROR ?
        'Oops! There was an error submitting your form.' : null;
  });

  protected sendFormData(formValue: Record<string, any>) {
    this.formSubmitStatus.set(FormSubmitStatus.PENDING);

    this.contactApiService.sendEmail(formValue).pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(error => {
        this.formSubmitStatus.set(FormSubmitStatus.ERROR);
        setTimeout(() => {
          this.formSubmitStatus.set(FormSubmitStatus.IDLE);
        }, 3000);
        throw new Error(error);
      })
    ).subscribe(resp => {
      this.formSubmitStatus.set(FormSubmitStatus.SUCCESS);
    })
  }
}
