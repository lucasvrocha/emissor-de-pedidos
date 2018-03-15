import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../ui/alert/alert.service';
import { AuthenticationService } from './auth.service';

import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../_helper/myErrorStateMatcher';
import { Usuario } from '../_model/usuario.model';

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
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public matcher: MyErrorStateMatcher) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.usuario, this.model.senha)
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
}