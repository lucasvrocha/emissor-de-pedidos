import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../auth';
import { CaixaService } from '../caixa.service';

@Component({
	selector: 'app-lancamento',
	templateUrl: './lancamento.component.html',
	styleUrls: ['./lancamento.component.css'],
	providers: [CaixaService]
})
export class LancamentoComponent implements OnInit {

	pagamentos: any[] = [
		{ value: 'Dinheiro', viewValue: 'Dinheiro' },
		{ value: 'C.Credito', viewValue: 'C.Credito' },
		{ value: 'C.Debito', viewValue: 'C.Debito' },
		{ value: 'Vale', viewValue: 'Vale' },
		{ value: 'Diversos', viewValue: 'Diversos' }
	]
	formGroup: FormGroup;

	caixa: any;
	lancamento: any;
	private permission: boolean;

	constructor(
		private fb: FormBuilder,
		private authService: AuthenticationService,
		private caixaService: CaixaService
	) { }

	
	ngOnInit() {
		this.permission = !!this.authService.hasPermition(["admin"]);

		this.formGroup = this.fb.group({
			id: ['',],
			descricao: ['', Validators.required],
			pagamento: ['', Validators.required],
			valor: ['', Validators.required]
		});

		this.formGroup.disable({});
		this.loadControls();
		this.caixaService.getCurrentCaixa().subscribe(caixa => {
			this.caixa = caixa;
			this.loadControls();
		});
	}

	salvar(btn) {
		btn.disabled = true;
		if (this.caixa == null)
			this.caixaService.createCaixa().subscribe(caixa => {
				this.caixa = caixa;
				this.caixaService.insert(this.formGroup.getRawValue(), caixa)
					.subscribe(lancamento => {
						this.loadControls(lancamento);
						btn.disabled = false;
						this.formGroup.disable({}); 
					});
			});
		else
			this.caixaService.insert(this.formGroup.getRawValue(), this.caixa)
				.subscribe(lancamento => {
					this.loadControls(lancamento);
					btn.disabled = false;
					this.formGroup.disable({});
				});
	}

	estornar(btn){
		btn.disabled = true;
		this.caixaService.estornarLancamento(this.caixa, this.lancamento)
			.subscribe(lancamento => {
				this.loadControls(lancamento);
				btn.disabled = false;
				this.formGroup.disable({});
			});
	}
	cancelar() {
		this.loadControls();
	}

	changeValue(){
		let ctrValor = this.formGroup.controls["valor"];
		ctrValor.setValue(ctrValor.value * -1);
	}

	private loadControls(lancamento = undefined) {
		if (!lancamento) {
			for (let c in this.formGroup.controls)
				this.formGroup.controls[c].reset({
					value: c === 'id' ? 'Sera gerado automaticamente' : c === 'descricao' && this.caixa == null ?  'Abertura de Caixa' : '',
					disabled: c === 'id' || !this.permission
				});
		} else {
			for (let a in lancamento) {
				this.formGroup.controls[a].reset({
					value: lancamento[a],
					disabled: a === 'id' || !this.permission
				});
			}
		}
		this.lancamento = lancamento;
	}


}
