import { Component, OnInit, AfterViewInit ,ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthGuard } from './auth/auth.guard';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { DialogComponent as FullScreenDialog } from './ui/fullscreen/dialog/dialog.component';
import * as screenfull from 'screenfull';

declare var GLOBAL_APP_INITIALIZED: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
	private storage = localStorage;

	title = 'Emissor de Pedido';
	constructor(
		public guard: AuthGuard,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		
	}

	ngAfterViewInit(){
		GLOBAL_APP_INITIALIZED = true;
	}
	
	openDialog(): void {
		let dialogRef = this.dialog.open(FullScreenDialog, {
			data: null
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
		});
	}
}
