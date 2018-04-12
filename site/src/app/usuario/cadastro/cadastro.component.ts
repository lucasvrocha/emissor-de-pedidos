import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

import { Subscription } from 'rxjs/Subscription';

import { Usuario } from '../../_model/usuario.model';
import { UsuarioService } from '../usuario.service'
import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';
import { LoadService } from '../../ui/load';
import { AuthenticationService } from '../../auth';
import { PasswordValidation } from '../../ui/form';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit, OnDestroy {

    formGroup: FormGroup;
    pwGroup: FormGroup;
    permission: boolean;
    usuario: Usuario;

    private sub: Subscription;
    private roles: string[] = ['admin', 'seller'];

    constructor(
        public matcher: MyErrorStateMatcher,
        private loadService: LoadService,
        private authService: AuthenticationService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        this.usuario = null;
        this.permission = !!this.authService.hasPermition(["admin"]);

        this.pwGroup = this.fb.group(
            {
                password: [''],
                confirmPassword: ['']
            },
            {
                validator: PasswordValidation.MatchPassword 
            });

        this.formGroup = this.fb.group({
            id: [''],
            nome: ['', Validators.required],
            usuario: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            roles: this.fb.group({
                admin: [false, Validators.required],
                seller: [false, Validators.required],
            }),
            pw: this.pwGroup
        });
        this.formGroup.disable({});

        this.sub = this.route.params.subscribe(params => {
            let id = params['id'];
            if (id === 'novo') {
                this.loadControls();
                return;
            }

            if (id !== 'novo' && isNaN(+id)) {
                this.ngAfterViewInit = () => {
                    this.router.navigate(['usuario']);
                }
                return;
            }

            this.usuarioService.getById(id).subscribe(usuario => {
                if (usuario == null) {
                    this.router.navigate(['usuario']);
                }
                this.loadControls(usuario);
            });
        });
    }

    ngAfterViewInit() { }

    ngOnDestroy() {
        if (this.sub) this.sub.unsubscribe();
    }

    novo() {
        this.router.navigate(['usuario', 'novo'])
    }

    salvar() {
        if (this.formGroup.invalid || this.pwGroup.invalid)
            return;

        let rawvalue = this.formGroup.getRawValue();
        let usuario = new Usuario();
        usuario.id = this.usuario == null ? undefined : this.usuario.id;
        usuario.nome = rawvalue.nome;
        usuario.email = rawvalue.email;
        usuario.roles = rawvalue.roles;
        usuario.usuario = rawvalue.usuario;

        if (this.pwGroup.valid && this.pwGroup.getRawValue().password != null && this.pwGroup.getRawValue().password != '')
            usuario.senha = this.pwGroup.getRawValue().password;

        let request;
        if (this.usuario != null) {
            request = this.usuarioService.update(usuario);
        } else {
            request = this.usuarioService.create(usuario);
        }

        request.subscribe(usuario => {
            this.usuario = usuario;
            if (usuario.id == this.authService.user.id)
                this.usuarioService.getById(usuario.id).subscribe(user =>{
                    this.authService.user = user;
                });
            this.router.navigate(['usuario', usuario.id]);
        });
    }

    cancelar() {
        this.loadControls(this.usuario);
    }

    excluir() {
        this.usuarioService.delete(this.usuario.id).subscribe((user :Usuario)=>{
            if(user.id == this.authService.user.id){
                this.authService.logout();
                return;  
            }
            this.router.navigate(['usuario']);
        })

    }

    private loadControls(usuario?: Usuario) {
        this.usuario = usuario;
        if (usuario == null) {
            for (let a in this.formGroup.controls) {
                let control = this.formGroup.controls[a];
                control.reset('');
                if (a !== 'id' && this.permission)
                    control.enable();
                else
                    control.disable();
            }
            return;
        }

        for (let c in this.formGroup.controls) {
            if (c === 'roles') {
                for (let role in this.formGroup.controls[c]['controls']) {

                    let value = usuario[c] == null ? '' : usuario.roles[role]
                    let control = this.formGroup.controls[c]['controls'][role];
                    control.reset(value);
                    if (this.permission)
                        control.enable();
                    else
                        control.disable();
                }
                continue;
            }

            let control = this.formGroup.controls[c];
            let value = usuario[c] == null ? '' : usuario[c];
            control.reset(value);
            if (c !== 'id' && this.permission) {
                control.enable();
            } else {
                control.disable();
            }
        }

    }

}


