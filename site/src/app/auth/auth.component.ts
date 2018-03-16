import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { AlertService } from '../ui/alert/alert.service';
import { DialogComponent } from './dialog/dialog.component';
import { AuthenticationService } from './auth.service';
import { MyErrorStateMatcher } from '../_helper/myErrorStateMatcher';
import { Usuario } from '../_model/usuario.model';
import { AppComponent } from '../app.component';


@Component({
    moduleId: module.id,
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

    model: Usuario = new Usuario();
    loading = false;
    returnUrl: string;

    senhaControl = new FormControl('form', [
        Validators.required
    ]);

    usuarioControl = new FormControl('form', [
        Validators.required
    ]);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService,
        private alertService: AlertService,
        public matcher: MyErrorStateMatcher,
        public dialog: MatDialog) { }

    ngOnInit() {
        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authService.login(this.model.usuario, this.model.senha)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    onSubmit() {
        this.login();
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(DialogComponent, {
            data: null
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        });
    }
}