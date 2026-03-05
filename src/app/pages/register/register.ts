import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PasswordField } from "../../shared/components/password-field/password-field";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PasswordField,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  encapsulation: ViewEncapsulation.None
})
export class Register {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get fullNameErrors(): string | null {
    const controll = this.form.get('fullName');
    if (controll?.hasError('required')) return 'O nome é um campo obrigatório';
    if (controll?.hasError('minlength')) return 'O nome tem menos de 3 caracteres';
    return null;
  }
  get EmailErrors(): string | null {
    const controll = this.form.get('email');
    if (controll?.hasError('required')) return 'O email é um campo obrigatório';
    if (controll?.hasError('email')) return 'Utilize um Email válido';
    return null;
  }

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    console.log(this.form.value);
  }
}
