import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AuthGuard } from './auth/auth.guard';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { DialogComponent as FullScreenDialog } from './ui/fullscreen/dialog/dialog.component';
import * as screenfull from 'screenfull';

import { LoadingService } from './ui/loading'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [LoadingService]
})
export class AppComponent implements OnInit {
	private storage = localStorage;

	title = 'Emissor de Pedido';
	constructor(
		public guard: AuthGuard,
		public dialog: MatDialog,
		private loadService: LoadingService
	) {
		this.loadService.init(2);
	}

	ngOnInit() {
		let opt: any = JSON.parse(this.storage.getItem('options'));
		if (opt && opt.fullscreen === true && screenfull.isFullscreen === false) {
			setTimeout(() => {
				this.openDialog();
				this.loadService.end();
			});
		}
		this.loadService.end();
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
