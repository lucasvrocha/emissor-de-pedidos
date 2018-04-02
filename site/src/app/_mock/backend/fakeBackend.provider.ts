import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProdutoInterceptor } from "./produto.interceptor";
import { FornecedorInterceptor } from "./fornecedor.interceptor";
import { AuthInterceptor } from './auth.interceptor';
import { UsuarioInterceptor } from './usuario.interceptor';
import { DelayInterceptor } from './delay.interceptor';

import { environment as env } from '../../../environments/environment';


export let FakeBackendProvider =
	[{
		// use fake backend in place of Http service for backend-less development
		provide: HTTP_INTERCEPTORS,
		useClass: DelayInterceptor,
		multi: true
	}, {
		// use fake backend in place of Http service for backend-less development
		provide: HTTP_INTERCEPTORS,
		useClass: FornecedorInterceptor,
		multi: true
	}, {
		// use fake backend in place of Http service for backend-less development
		provide: HTTP_INTERCEPTORS,
		useClass: ProdutoInterceptor,
		multi: true
	}, {
		// use fake backend in place of Http service for backend-less development
		provide: HTTP_INTERCEPTORS,
		useClass: UsuarioInterceptor,
		multi: true
	}, {
		// use fake backend in place of Http service for backend-less development
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	}];