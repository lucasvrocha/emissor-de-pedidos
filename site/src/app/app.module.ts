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
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './ui/navbar/navbar.component';
import { CadastroComponent as PedidoCadastroComponent } from './pedido/cadastro/cadastro.component';
import { ListaComponent as PedidoListaComponent } from './pedido/lista/lista.component';
import { ProdutoListaComponent } from './produto/lista/produto-lista.component';
import { ProdutoCadastroComponent } from './produto/cadastro/produto-cadastro.component';
import { CadastroComponent as FornecedorCadastroComponent } from './fornecedor/cadastro/cadastro.component';
import { ListaComponent as FornecedorListaComponent } from './fornecedor/lista/lista.component';
import { CadastroComponent as UsuarioCadastroComponent } from './usuario/cadastro/cadastro.component';
import { ListaComponent as UsuarioListaComponent } from './usuario/lista/lista.component';
import { JwtProviver } from './_helper/jwt.interceptor';
import { FakeBackendProvider } from './_mock/backend/fakeBackend.provider';
import { ToolbarComponent, ToolbarBuilder } from './ui/toolbar/toolbar.component';
import { MyErrorStateMatcherProvider } from './_helper/myErrorStateMatcher';
import { AuthComponent } from './auth/auth.component';
import { IconComponent } from './ui/icon/icon.component';
import { AuthenticationService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { DialogComponent as AuthDialogComponent } from './auth/dialog/dialog.component';
import { AlertComponent } from './ui/alert/alert.component';
import { AlertService } from './ui/alert/alert.service';
import { SpinerComponent } from './ui/spiner/spiner.component';
import { FullscreenDirective } from './ui/fullscreen/fullscreen.directive';
import { DialogComponent as FullscreenDialogComponent } from './ui/fullscreen/dialog/dialog.component';
import { UserComponent } from './ui/navbar/user/user.component';
import { MediaQueryDirective } from './ui/media-query/media-query.directive';
import { FooterComponent } from './ui/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './ui/frame/list/list.component';


@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		ProdutoListaComponent,
		IconComponent,
		ProdutoCadastroComponent,
		FornecedorCadastroComponent,
		FornecedorListaComponent,
		UsuarioCadastroComponent,
		UsuarioListaComponent,
		ToolbarComponent,
		AuthComponent,
		AlertComponent,
		AuthDialogComponent,
		SpinerComponent,
		FullscreenDirective,
		FullscreenDialogComponent,
		UserComponent,
		MediaQueryDirective,
		FooterComponent,
		PedidoCadastroComponent,
		PedidoListaComponent,
		DashboardComponent,
		ListComponent
	],
	entryComponents: [
		AuthDialogComponent,
		FullscreenDialogComponent
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
		MatListModule,
		MatDialogModule,
		MatMenuModule,
		MatExpansionModule
	],
	providers: [
		MyErrorStateMatcherProvider,
		JwtProviver,
		AuthGuard,
		AlertService,
		AuthenticationService,
		FakeBackendProvider
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
