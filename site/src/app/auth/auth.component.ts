import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { AlertService } from '../ui/alert/alert.service';
import { DialogComponent } from './dialog/dialog.component';
import { AuthenticationService } from './auth.service';
import { MyErrorStateMatcher } from '../_helper/myErrorStateMatcher';
import { Usuario } from '../_model/usuario.model';
import { AppComponent } from '../app.component';
import { LoadService, LoadComponent } from '../ui/load';


@Component({
    moduleId: module.id,
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, AfterViewInit {


    model: Usuario = new Usuario();
    load = false;
    returnUrl: string;

    senhaControl = new FormControl('form', [
        Validators.required
    ]);

    usuarioControl = new FormControl('form', [
        Validators.required
    ]);

    validForm: string = 'disabled';

    private loader: LoadComponent;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService,
        private alertService: AlertService,
        public matcher: MyErrorStateMatcher,
        public dialog: MatDialog,
        private loadService: LoadService
    ) { }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.usuarioControl.updateValueAndValidity();
        this.loadService.init('main').process((load) => {
            load.progress(85);
            this.authService.verifyJwt().subscribe(user => {
                if (user) this.router.navigate([this.returnUrl]);
                load.end();
            });
        });
    }

    ngAfterViewInit() {
        this.validForm = (this.senhaControl.invalid || this.usuarioControl.invalid) ? 'disabled' : '';

    }

    login() {
        this.load = true;
        this.authService.login(this.model.usuario, this.model.senha)
            .subscribe(
                data => {
                    if (data)
                        this.router.navigate([this.returnUrl]);
                    else
                        this.alertService.error("Usuario e/ou senha incorreto");
                },
                error => {
                    this.alertService.error(error);
                    this.load = false;
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