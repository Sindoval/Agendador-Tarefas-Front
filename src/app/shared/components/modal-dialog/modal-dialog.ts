import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


export interface DialogField {
  name: string
  label: string
  value?: string | number | Date;
  type?: 'text' | 'number' | 'time' | 'date';
  validators?: any[]
  button?: { icon: string, callback: (value: string, dialogRef: MatDialogRef<ModalDialog>) => void }
}

interface DialogData {
  title: string
  formConfig: DialogField[]
}

@Component({
  selector: 'app-modal-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatInput,
    MatInputModule,
    MatIconModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-dialog.html',
  styleUrl: './modal-dialog.scss',
})
export class ModalDialog {
  readonly formBuilder = inject(FormBuilder)
  readonly dialogRef = inject(MatDialogRef<ModalDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  fields: DialogField[] = this.data.formConfig ?? [];

  private buildControls(): Record<string, any> {
    const controls: Record<string, any> = {}

    this.fields.forEach(field => {
      controls[field.name] = new FormControl(field.value ?? '', field.validators || [])
    })

    return controls;
  }

  form: FormGroup = this.formBuilder.group(this.buildControls())

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.form.value);
  }
}
