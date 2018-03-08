import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoComponent }	 from './pedido/pedido.component';
import { ProdutoListaComponent }  from './produto/lista/produto-lista.component'
import { ProdutoCadastroComponent }  from './produto/cadastro/produto-cadastro.component'
import { CadastroComponent as FornecedorCadastroComponent}  from './fornecedor/cadastro/cadastro.component';
import { ListaComponent as FornecedorListaComponent}  from './fornecedor/lista/lista.component';


const routes: Routes = [
	{ path: '', component: PedidoComponent }
	, { path: 'produto', component: ProdutoListaComponent }
	, { path: 'produto/:id', component: ProdutoCadastroComponent }
	, { path: 'fornecedor', component: FornecedorListaComponent }
	, { path: 'fornecedor/:id', component: FornecedorCadastroComponent }
	,{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
