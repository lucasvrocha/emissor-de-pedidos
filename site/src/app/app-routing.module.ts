import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { AuthComponent } from  './auth/auth.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProdutoListaComponent } from './produto/lista/produto-lista.component'
import { ProdutoCadastroComponent } from './produto/cadastro/produto-cadastro.component'
import { CadastroComponent as FornecedorCadastroComponent } from './fornecedor/cadastro/cadastro.component';
import { ListaComponent as FornecedorListaComponent } from './fornecedor/lista/lista.component';
import { CadastroComponent as UsuarioCadastroComponent } from './usuario/cadastro/cadastro.component';
import { ListaComponent as UsuarioListaComponent } from './usuario/lista/lista.component';

const routes: Routes = [
	{ path: '', component: PedidoComponent , canActivate: [AuthGuard] }
	, { path: 'fornecedor', component: FornecedorListaComponent , canActivate: [AuthGuard]}
	, { path: 'fornecedor/:id', component: FornecedorCadastroComponent , canActivate: [AuthGuard]}
	, { path: 'login', component: AuthComponent }
	, { path: 'produto', component: ProdutoListaComponent , canActivate: [AuthGuard]}
	, { path: 'produto/:id', component: ProdutoCadastroComponent , canActivate: [AuthGuard]}
	, { path: 'usuario', component: UsuarioListaComponent , canActivate: [AuthGuard]}
	, { path: 'usuario/:id', component: UsuarioCadastroComponent , canActivate: [AuthGuard]}
	, { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
