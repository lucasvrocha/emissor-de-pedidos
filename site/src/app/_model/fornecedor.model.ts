export interface Fornecedor {
	id: number;
	razao: string;
	cnpj: string;
	ie: string;
	fantasia: string;
	email: string;
}

export class Fornecedor implements Fornecedor {
	id: number = null;
	razao: string = null;
	cnpj: string = null;
	ie: string = null;
	fantasia: string = null;
	email: string = null;
}