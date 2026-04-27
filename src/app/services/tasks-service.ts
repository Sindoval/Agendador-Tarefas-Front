import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Auth } from './auth';
import { Observable, tap } from 'rxjs';

interface TasksResponse {
  id: string,
  nomeTarefa: string,
  descricao: string,
  dataCriacao: string,
  dataEvento: string,
  emailUsuario: string,
  dataAlteracao: string,
  status: "PENDENTE" | "NOTIFICADO" | "CANCELADO"
}

export interface TasksPayload {
  id?: string,
  nomeTarefa: string,
  descricao: string,
  dataEvento: string,
}

@Injectable({
  providedIn: 'root',
})

export class TasksService {
  private API_URL = 'http://localhost:8084';  //TODO: add .ENV
  private _tasks = signal<TasksResponse[] | null>(null);
  readonly tasks = this._tasks.asReadonly();

  constructor(
    private http: HttpClient,
    private authService: Auth) {
    this.loadTasks();
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `${token}` })
  }

  loadTasks(): void {
    this.http.get<TasksResponse[]>(`${this.API_URL}/tarefas`, { headers: this.getHeaders() }).subscribe({
      next: tasks => this._tasks.set(tasks),
      error: () => this._tasks.set([])
    });
  }

  createTask(body: TasksPayload): Observable<TasksResponse> {
    return this.http.post<TasksResponse>(`${this.API_URL}/tarefas`, body, { headers: this.getHeaders() }).pipe(
      tap(() => this.loadTasks())
    );
  }

  editTask(id: string, body: TasksPayload): Observable<TasksResponse> {
    return this.http.put<TasksResponse>(`${this.API_URL}/tarefas?id=${id}`, body, { headers: this.getHeaders() }).pipe(
      tap(() => this.loadTasks())
    );
  }

  deletarTask(id: string): Observable<TasksResponse> {
    return this.http.delete<TasksResponse>(`${this.API_URL}/tarefas?id=${id}`, { headers: this.getHeaders() }).pipe(
      tap(() => this.loadTasks())
    );
  }
}
