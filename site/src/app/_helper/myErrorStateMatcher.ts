import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
@Injectable()
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

export let MyErrorStateMatcherProvider = [
	{
		provide: ErrorStateMatcher,
		useClass: ShowOnDirtyErrorStateMatcher
	}, {
		provide: MyErrorStateMatcher,
		useClass: ShowOnDirtyErrorStateMatcher
	}]
