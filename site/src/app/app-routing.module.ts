import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoComponent }	 from './pedido/pedido.component';
import { ProdutoListaComponent }  from './produto/lista/produto-lista.component'
import { ProdutoCadastroComponent }  from './produto/cadastro/produto-cadastro.component'
import { CadastroComponent as FornecedorCadastroComponent}  from './fornecedor/cadastro/cadastro.component';
import { ListaComponent as FornecedorListaComponent}  from './fornecedor/lista/lista.component';
import { CadastroComponent as UsuarioCadastroComponent}  from './usuario/cadastro/cadastro.component';
import { ListaComponent as UsuarioListaComponent}  from './usuario/lista/lista.component';


const routes: Routes = [
	{ path: '', component: PedidoComponent }
	, { path: 'fornecedor', component: FornecedorListaComponent }
	, { path: 'fornecedor/:id', component: FornecedorCadastroComponent }
	, { path: 'produto', component: ProdutoListaComponent }
	, { path: 'produto/:id', component: ProdutoCadastroComponent }
	, { path: 'usuario', component: UsuarioListaComponent }
	, { path: 'usuario/:id', component: UsuarioCadastroComponent }
	,{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
