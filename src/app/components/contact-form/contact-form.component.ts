import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAX_INPUT_TEXT_LENGTH, MAX_TEXTAREA_LENGTH } from "../../app.models";

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  standalone: true
})
export class ContactFormComponent {
  public readonly isFormSubmitting = input<boolean>();
  public readonly sendFormData = output<Record<string, any>>();

  protected readonly form = new FormGroup({
    title: new FormControl('', [Validators.maxLength(MAX_INPUT_TEXT_LENGTH)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(MAX_INPUT_TEXT_LENGTH)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(MAX_INPUT_TEXT_LENGTH), Validators.email]),
    message: new FormControl('', [Validators.required, Validators.maxLength(MAX_TEXTAREA_LENGTH)]),
  });

  protected onFormSubmit(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.sendFormData.emit(this.form.value);
  }

  private createFormData(): FormData {
    const formData = new FormData();
    const formValue = this.form.value;
    Object.keys(formValue).forEach(key => {
      const value = (formValue as Record<string, string>)[key];
      if (value) {
        formData.append(key, value);
      }
    });
    return formData;
  }
}
