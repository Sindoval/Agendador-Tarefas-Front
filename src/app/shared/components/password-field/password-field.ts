import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-field',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './password-field.html',
  styleUrl: './password-field.scss',
})
export class PasswordField {
  hide = signal(true);

  //Input = prop   ! = non-null assetion operator(Essa propriedade vai vir em tempo de execucao)
  @Input({ required: true }) control!: FormControl;

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  get passwordErrors(): string | null {
    const controll = this.control;
    if (controll?.hasError('required')) return 'A senha é um campo obrigatório';
    if (controll?.hasError('minlength')) return 'A senha deve ter pelo menos de 6 caracteres';
    return null;
  }
}
