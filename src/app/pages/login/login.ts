import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PasswordField } from '../../shared/components/password-field/password-field';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User, UserLoginPayload } from '../../services/user';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup<{ email: FormControl<string>, senha: FormControl<string> }>
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private UserService: User,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: Auth
  ) {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control('', { validators: [Validators.required, Validators.email], nonNullable: true }),
      senha: this.formBuilder.control('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true })
    });
  }

  get EmailErrors(): string | null {
    const controll = this.form.get('email');
    if (controll?.hasError('required')) return 'O email é um campo obrigatório';
    if (controll?.hasError('email')) return 'Utilize um Email válido';
    return null;
  }

  get passwordControl(): FormControl {
    return this.form.get('senha') as FormControl;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    const formData = this.form.value as UserLoginPayload;
    this.isLoading = true;

    this.UserService.login(formData)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/'])
          this.authService.saveToken(response);
        },
        error: (error) => {
          console.error(`Erro ao logar usuário`, error);
        }
      });
  }
}
