import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';
import { IconModel, IconBuilder } from '../../ui/icon';
import { ToolbarModel, ToolbarBuilder } from '../../ui/toolbar';


@Component({
	moduleId: module.id,
	selector: 'app-cadastro',
	templateUrl: './cadastro.component.html',
	styleUrls: ['./cadastro.component.css'],
	providers: [IconBuilder, ToolbarBuilder]
})
export class CadastroComponent implements OnInit {
	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);

	toolbar: ToolbarModel;

	constructor(public matcher: MyErrorStateMatcher,
		iconBuilder: IconBuilder,
		tb: ToolbarBuilder) {

		this.toolbar = tb
			.withTitle({ description: "Novo Fornecedor", icon: tb.icon('business') })
			.forward({url: undefined, icon :tb.icon('save').build()})
			.build();
	}


	ngOnInit() {
	}

}
