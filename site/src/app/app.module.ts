import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';	
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProdutoComponent } from './produto/produto.component';
import { OrcamentoComponent } from './orcamento/orcamento.component';
import { IconComponent } from './ui/icon/icon.component';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ProdutoComponent,
		OrcamentoComponent,
		IconComponent
	],
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatProgressBarModule,
		MatIconModule,
		MatTableModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatSortModule

	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
