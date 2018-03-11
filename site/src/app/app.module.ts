import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './ui/navbar/navbar.component';
import { ProdutoListaComponent } from './produto/lista/produto-lista.component';
import { IconComponent } from './ui/icon/icon.component';
import { ProdutoCadastroComponent } from './produto/cadastro/produto-cadastro.component';
import { PedidoComponent } from './pedido/pedido.component';

import { CadastroComponent as FornecedorCadastroComponent } from './fornecedor/cadastro/cadastro.component';
import { ListaComponent as FornecedorListaComponent } from './fornecedor/lista/lista.component';

import { CadastroComponent as UsuarioCadastroComponent } from './usuario/cadastro/cadastro.component';
import { ListaComponent as UsuarioListaComponent } from './usuario/lista/lista.component';

import { FakeBackendProvider } from './_mock/backend/fakeBackend.provider';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { MyErrorStateMatcherProvider } from './_helper/myErrorStateMatcher'

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		ProdutoListaComponent,
		IconComponent,
		ProdutoCadastroComponent,
		PedidoComponent,
		FornecedorCadastroComponent,
		FornecedorListaComponent,
		UsuarioCadastroComponent,
		UsuarioListaComponent,
		ToolbarComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MatToolbarModule,
		MatProgressBarModule,
		MatIconModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatSortModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatCheckboxModule,
		MatCardModule,
		MatDividerModule,
		MatSidenavModule,
		MatListModule
	],
	providers: [
		FakeBackendProvider,
		MyErrorStateMatcherProvider
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
