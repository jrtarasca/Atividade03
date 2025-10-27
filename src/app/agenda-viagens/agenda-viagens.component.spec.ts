import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ArmazenamentoService } from '../services/armazenamento.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agenda-viagens',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agenda-viagens.component.html',
  styleUrls: ['./agenda-viagens.component.css']
})
export class AgendaViagensComponent implements OnInit, OnDestroy {
  formularioViagem: FormGroup;
  private inscricaoMudancasFormulario!: Subscription;

  destinos = [
    'Paris',
    'Nova York',
    'Tóquio',
    'Rio de Janeiro'
  ];

  constructor(
    private fb: FormBuilder,
    private armazenamentoService: ArmazenamentoService
  ) {
    this.formularioViagem = this.criarFormulario();
  }

  ngOnInit(): void {
    this.carregarDadosSalvos();
    this.configurarSalvamentoAutomatico();
  }

  ngOnDestroy(): void {
    if (this.inscricaoMudancasFormulario) {
      this.inscricaoMudancasFormulario.unsubscribe();
    }
  }

  private criarFormulario(): FormGroup {
    return this.fb.group({
      destino: ['', Validators.required],
      dataIda: ['', Validators.required],
      dataVolta: ['', [Validators.required]],
      passageiros: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    }, { validators: this.validadorDatas });
  }

  private validadorDatas(control: AbstractControl): ValidationErrors | null {
    const dataIda = control.get('dataIda')?.value;
    const dataVolta = control.get('dataVolta')?.value;

    if (dataIda && dataVolta) {
      const ida = new Date(dataIda);
      const volta = new Date(dataVolta);

      if (volta <= ida) {
        return { dataInvalida: true };
      }
    }

    return null;
  }

  private carregarDadosSalvos(): void {
    const dadosSalvos = this.armazenamentoService.obterDadosFormulario();
    if (dadosSalvos) {
      this.formularioViagem.patchValue(dadosSalvos);
    }
  }

  private configurarSalvamentoAutomatico(): void {
    this.inscricaoMudancasFormulario = this.formularioViagem.valueChanges.subscribe(valor => {
      this.armazenamentoService.salvarDadosFormulario(valor);
    });
  }

  enviarFormulario(): void {
    if (this.formularioViagem.valid) {
      console.log('Dados do formulário:', this.formularioViagem.value);
      alert('Reserva enviada com sucesso!');

    } else {
      this.marcarTodosCamposComoTouchados();
    }
  }

  private marcarTodosCamposComoTouchados(): void {
    Object.keys(this.formularioViagem.controls).forEach(chave => {
      const controle = this.formularioViagem.get(chave);
      controle?.markAsTouched();
    });
  }


  get destino() { return this.formularioViagem.get('destino'); }
  get dataIda() { return this.formularioViagem.get('dataIda'); }
  get dataVolta() { return this.formularioViagem.get('dataVolta'); }
  get passageiros() { return this.formularioViagem.get('passageiros'); }
  get email() { return this.formularioViagem.get('email'); }
}