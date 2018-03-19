import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../auth/auth.guard';

import { Usuario } from '../../../_model/usuario.model';

@Component({
  selector: 'ui-navbar-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor( public  guard : AuthGuard) { }

  ngOnInit() {
  }

}
