import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ModalDialog } from '../modal-dialog/modal-dialog';

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
  message: string
  confirmButton: string
  cancelButton: string
}

@Component({
  selector: 'app-confirm-modal-dialog',
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
  templateUrl: './confirm-modal-dialog.html',
  styleUrl: './confirm-modal-dialog.scss',
})
export class ConfirmModalDialog {
  readonly dialogRef = inject(MatDialogRef<ModalDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
