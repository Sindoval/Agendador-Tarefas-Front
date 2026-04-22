import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Auth } from '../../services/auth';
import { DialogField, ModalDialog } from '../../shared/components/modal-dialog/modal-dialog';

@Component({
  selector: 'app-tasks',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {
  mockBpdy = {
    nomeTarefa: "string",
    descricao: "string",
    dataEvento: "2026-04-20T20:49:37.725Z"
  }

  private authService = inject(Auth);
  readonly dialog = inject(MatDialog);

  cadastrarTarefa() {
    const token = this.authService.getToken();
    if (!token) return;

    const formConfig: DialogField[] = [
      { name: 'nomeTarefa', label: 'Nome da Tarefa' },
      { name: 'descricao', label: 'Descreva a Tarefa' },
    ]

    const dialogRef = this.dialog.open(ModalDialog, {
      data: { title: 'Adicionar Tarefa', formConfig },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Tarefa Cadastrada", result);

        /* result.numero = Number(result.numero);
        this.userService.saveEndereco(result, token).subscribe({
          next: () => console.log('Endereco cadastrado com sucesso', result),
          error: () => console.log('Erro ao cadastrar Endereco', result)
        }); */
      }
    });
  }
}
