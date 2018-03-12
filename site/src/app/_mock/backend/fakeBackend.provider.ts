import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProdutoInterceptor } from "./produto.interceptor";
import { FornecedorInterceptor } from "./fornecedor.interceptor";
import { AuthInterceptor } from './auth.interceptor';


export let FakeBackendProvider = [ {
	// use fake backend in place of Http service for backend-less development
	provide: HTTP_INTERCEPTORS,
	useClass: FornecedorInterceptor,
	multi: true
},{
	// use fake backend in place of Http service for backend-less development
	provide: HTTP_INTERCEPTORS,
	useClass: ProdutoInterceptor,
	multi: true
},{
	// use fake backend in place of Http service for backend-less development
	provide: HTTP_INTERCEPTORS,
	useClass: AuthInterceptor,
	multi: true
}];