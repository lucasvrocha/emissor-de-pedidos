import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';
import { IconModel, IconBuilder } from '../../ui/icon';
import { ToolbarModel, ToolbarBuilder } from '../../ui/toolbar';
import { LoadingService } from '../../ui/loading'

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
		tb: ToolbarBuilder,
		private loadService : LoadingService) {
		this.loadService.start();
		this.toolbar = tb
			.withTitle({ description: "Novo Fornecedor", icon: tb.icon('business') })
			.forward({url: undefined, icon :tb.icon('save').build()})
			.build();
	}


	ngOnInit() {
		this.loadService.end();
	}

}
