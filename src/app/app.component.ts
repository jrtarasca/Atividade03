import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaViagensComponent } from './agenda-viagens/agenda-viagens.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AgendaViagensComponent],
  template: `
    <div class="container-app">
      <app-agenda-viagens></app-agenda-viagens>
    </div>
  `
})
export class AppComponent {
  title = 'Atividade03';
}