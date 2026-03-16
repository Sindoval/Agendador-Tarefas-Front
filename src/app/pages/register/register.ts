import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PasswordField } from "../../shared/components/password-field/password-field";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../services/user';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PasswordField,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  encapsulation: ViewEncapsulation.None
})
export class Register {
  form: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: User,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  get fullNameErrors(): string | null {
    const controll = this.form.get('nome');
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

    const formData = this.form.value;
    this.isLoading = true;

    this.UserService.register(formData)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/login'])
        },
        error: (error) => {
          console.error(`Erro ao registrar usuário`, error);
        }
      });
  }
}
