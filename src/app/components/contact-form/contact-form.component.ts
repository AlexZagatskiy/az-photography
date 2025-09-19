import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormSubmitStatus, MAX_INPUT_TEXT_LENGTH, MAX_TEXTAREA_LENGTH } from "../../app.models";

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  public readonly formSubmitStatus = input<FormSubmitStatus>();
  public readonly feedbackMessage = input<string | null>();
  public readonly sendFormData = output<Record<string, any>>();

  protected readonly form = new FormGroup({
    title: new FormControl('', [Validators.maxLength(MAX_INPUT_TEXT_LENGTH)]),
    name: new FormControl('', [Validators.maxLength(MAX_INPUT_TEXT_LENGTH)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(MAX_INPUT_TEXT_LENGTH), Validators.email]),
    message: new FormControl('', [Validators.required, Validators.maxLength(MAX_TEXTAREA_LENGTH)]),
  });

  protected readonly isFormSubmitting = computed(() => {
    return this.formSubmitStatus() === FormSubmitStatus.PENDING;
  });

  protected readonly isFailed = computed(() => {
    return this.formSubmitStatus() === FormSubmitStatus.ERROR;
  });

  protected onFormSubmit(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.form.invalid || this.form.value.title) { // title is a hidden input, should be empty
      this.form.markAllAsTouched();
      return;
    }
    this.sendFormData.emit(this.form.value);
  }
}
