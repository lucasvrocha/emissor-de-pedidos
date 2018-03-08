import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

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

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { ProdutoListaComponent } from './produto/lista/produto-lista.component';
import { IconComponent } from './ui/icon/icon.component';

import { ProdutoCadastroComponent } from './produto/cadastro/produto-cadastro.component';
import { PedidoComponent } from './pedido/pedido.component';
import { CadastroComponent } from './fornecedor/cadastro/cadastro.component';
import { ListaComponent } from './fornecedor/lista/lista.component';

import { FakeBackendProvider } from './_mock/backend/fakeBackend.provider';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ProdutoListaComponent,
		IconComponent,
		ProdutoCadastroComponent,
		PedidoComponent,
		CadastroComponent,
		ListaComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FormsModule,
		MatToolbarModule,
		MatProgressBarModule,
		MatIconModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatSortModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule
	],
	providers: [FakeBackendProvider],
	bootstrap: [AppComponent]
})
export class AppModule { }
