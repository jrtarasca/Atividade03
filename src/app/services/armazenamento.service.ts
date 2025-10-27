import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArmazenamentoService {
  private readonly CHAVE_ARMAZENAMENTO = 'dados_agenda_viagens';

  salvarDadosFormulario(dadosFormulario: any): void {
    localStorage.setItem(this.CHAVE_ARMAZENAMENTO, JSON.stringify(dadosFormulario));
  }

  obterDadosFormulario(): any {
    const dados = localStorage.getItem(this.CHAVE_ARMAZENAMENTO);
    return dados ? JSON.parse(dados) : null;
  }

  limparDadosFormulario(): void {
    localStorage.removeItem(this.CHAVE_ARMAZENAMENTO);
  }
}