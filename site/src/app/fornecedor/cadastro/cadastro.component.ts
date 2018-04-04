import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';
import { IconModel, IconBuilder } from '../../ui/icon';
import { ToolbarModel, ToolbarBuilder } from '../../ui/toolbar';
import { LoadingService } from '../../ui/loading'

import { AuthenticationService } from '../../auth';

@Component({
	moduleId: module.id,
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css'],
	providers: [IconBuilder, ToolbarBuilder]
})
export class CadastroComponent implements OnInit {

	formGroup: FormGroup;


	constructor(public matcher: MyErrorStateMatcher,
		iconBuilder: IconBuilder,
		tb: ToolbarBuilder,
		authService: AuthenticationService,
		private loadService: LoadingService
	) {
		this.loadService.start();

		let permission = authService.hasPermition(["admin"]);
		let formControlTemplate = { value: '', disabled: !permission };

		this.formGroup = new FormGroup({
			cnpj: new FormControl(formControlTemplate),
			ie: new FormControl(formControlTemplate),
			razao: new FormControl(formControlTemplate),
			fantasia: new FormControl(formControlTemplate),
			email: new FormControl(formControlTemplate, [
				Validators.required,
				Validators.email,
			])
		});
	}


	ngOnInit() {
		this.loadService.end();
	}

	ngOnChanges(){
		console.log(this.formGroup.hasError('email'));
	}

}
