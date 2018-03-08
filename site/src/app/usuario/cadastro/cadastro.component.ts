import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);
  constructor(public matcher : MyErrorStateMatcher) { }

  ngOnInit() {
  }

}
