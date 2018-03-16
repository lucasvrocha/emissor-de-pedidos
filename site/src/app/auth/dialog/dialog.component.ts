import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';
import { AuthenticationService } from '../auth.service';
import { SpinerComponent } from '../../ui/spiner/spiner.component';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.css'],
	providers: [SpinerComponent],
	entryComponents: [SpinerComponent]
})
export class DialogComponent implements OnInit {

	@ViewChild(SpinerComponent) spiner: SpinerComponent;

	email: string = '';
	sub: any;

	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);

	constructor(
		public matcher : MyErrorStateMatcher,
		public dialogRef: MatDialogRef<DialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private authService: AuthenticationService) { }

	ngOnInit() {
		this.sub = this.spiner.onClose()
			.subscribe(close => {
				console.log("close", close);
				if (close === true)
					this.onNoClick();
			});
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onSubmit(): void {
		this.spiner.show()
		this.authService.recuperarSenha(this.email)
			.subscribe(body => {
				this.spiner.setMessage({
					title: body.message,
					body: 'Acesse o seu e-mail e siga as instruções para concluir o acesso!'
				});
				this.spiner.complete().closeAfter(12000);
			});
	}

	ngOnDestroy() {
		if (this.sub) this.sub.unsubscribe();
	}

}
