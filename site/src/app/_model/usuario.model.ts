export interface Usuario {
	id: number;
	nome: string;
	usuario: string;
	senha: string;
	email: string;
	jwt: string;
	foto: string;
	roles: { 
		admin: boolean,
		seller: boolean 
		}
}

export class Usuario implements Usuario {
	constructor() { };
}