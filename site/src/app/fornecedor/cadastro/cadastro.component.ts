import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';
import { IconModel, IconBuilder } from '../../ui/icon/icon.component';
import { ToolbarModel, ToolbarBuilder } from '../../ui/toolbar/toolbar.component';


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
			.withTitle({ description: "Cadasatro de Fornecedor", icon: tb.icon('bussines') })
			.goto({url: './novo', icon :tb.icon('add_box')})
			.build();
	}


	ngOnInit() {
	}

}
