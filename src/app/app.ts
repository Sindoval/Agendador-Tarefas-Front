import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Register } from './pages/register/register';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('agendador-tarefas');
}
