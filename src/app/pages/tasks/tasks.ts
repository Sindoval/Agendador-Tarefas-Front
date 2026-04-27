import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { TasksPayload, TasksService } from '../../services/tasks-service';
import { DialogField, ModalDialog } from '../../shared/components/modal-dialog/modal-dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmModalDialog } from '../../shared/components/confirm-modal-dialog/confirm-modal-dialog';

@Component({
  selector: 'app-tasks',
  imports: [MatCardModule, MatButtonModule, MatExpansionModule, MatIconModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})

export class Tasks {
  private tasksService = inject(TasksService)
  readonly dialog = inject(MatDialog);
  readonly panelOpenState = signal(false);
  tasks = this.tasksService.tasks;

  normalizarDataEvento(dataEvento: string) {
    const [data, horario] = dataEvento.split(' ');
    const [dia, mes, ano] = data.split('-').map(Number);
    const [hora, minuto, segundo] = horario.split(':').map(Number);

    const dataFormatada = new Date(ano, mes, dia, hora, minuto);

    return { dataFormatada }
  }

  cadastrarTarefa() {

    const formConfig: DialogField[] = [
      { name: 'nomeTarefa', label: 'Nome da Tarefa' },
      { name: 'descricao', label: 'Descrição' },
      { name: 'data', label: 'Data da Tarefa', type: 'date' },
      { name: 'tempo', label: 'Hora da tarefa', type: 'time' },
    ]

    const dialogRef = this.dialog.open(ModalDialog, {
      data: { title: 'Adicionar Tarefa', formConfig },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { data, tempo, ...resto } = result;

        const dateTimeFormatter = (n: number) => n.toString().padStart(2, "0");

        const ano = data.getFullYear();
        const mes = dateTimeFormatter(data.getMonth());
        const dia = dateTimeFormatter(data.getDate());

        const hora = dateTimeFormatter(tempo.getHours());
        const minuto = dateTimeFormatter(tempo.getMinutes());
        const segundo = dateTimeFormatter(tempo.getSeconds());

        const dataEvento = `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`;

        const payload = {
          ...resto,
          dataEvento
        }

        this.tasksService.createTask(payload).subscribe({
          next: () => console.log('Task cadastrado com sucesso', payload),
          error: () => console.log('Erro ao cadastrar Task', payload)
        });
      }
    });
  }

  deletarTarefa(id: string) {


    const dialogRef = this.dialog.open(ConfirmModalDialog, {
      data: {
        title: 'Confirmar exclusão de Tarefa',
        message: 'Tem certeza que deseja deletar esta tarefa?',
        confirmButton: 'Deletar',
        cancelButton: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasksService.deletarTask(id).subscribe({
          next: () => console.log('Task deletada com sucesso'),
          error: () => console.log('Erro ao deletar Task')
        });
      }
    });
  }

  editarTarefa(tarefa: TasksPayload) {

    const { dataFormatada } = this.normalizarDataEvento(tarefa.dataEvento);


    const formConfig: DialogField[] = [
      { name: 'nomeTarefa', label: 'Nome da Tarefa', value: tarefa.nomeTarefa },
      { name: 'descricao', label: 'Descrição', value: tarefa.descricao },
      { name: 'data', label: 'Data da Tarefa', type: 'date', value: dataFormatada },
      { name: 'tempo', label: 'Hora da tarefa', type: 'time', value: dataFormatada },
    ]

    const dialogRef = this.dialog.open(ModalDialog, {
      data: { title: 'Editar Tarefa', formConfig },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { data, tempo, ...resto } = result;

        const dateTimeFormatter = (n: number) => n.toString().padStart(2, "0");

        const ano = data.getFullYear();
        const mes = dateTimeFormatter(data.getMonth());
        const dia = dateTimeFormatter(data.getDate());

        const hora = dateTimeFormatter(tempo.getHours());
        const minuto = dateTimeFormatter(tempo.getMinutes());
        const segundo = dateTimeFormatter(tempo.getSeconds());

        const dataEvento = `${dia}-${mes}-${ano} ${hora}:${minuto}:${segundo}`;

        const payload = {
          ...resto,
          dataEvento
        }

        console.log(tarefa.id);

        this.tasksService.editTask(tarefa.id!, payload).subscribe({
          next: () => console.log('Task cadastrado com sucesso', payload),
          error: () => console.log('Erro ao cadastrar Task', payload)
        });
      }
    });
  }



  hasTasks = () => (this.tasks() ?? []).length > 0;
}
