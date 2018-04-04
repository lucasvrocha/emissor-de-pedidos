import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../_helper/myErrorStateMatcher';

import { LoadingService } from '../../ui/loading';
import { AuthenticationService } from '../../auth';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

    formGroup : FormGroup;
    
    constructor(
        public matcher: MyErrorStateMatcher, 
        private loadService: LoadingService,
        private authService : AuthenticationService) {

        this.loadService.start();
        let permission = this.authService.hasPermition(["admin"]);
        let formControlTemplate = {value: '', disabled : !permission}
        this.formGroup = new FormGroup({
            nome : new FormControl(formControlTemplate),
            usuario: new FormControl(formControlTemplate),
            senha: new FormControl(formControlTemplate),
            senha2: new FormControl(formControlTemplate),
            adm: new FormControl(formControlTemplate),
            email : new FormControl(formControlTemplate, [
                Validators.required,
                Validators.email,
                ])
        });
    }

    ngOnInit() {
        this.loadService.end();
    }

}
