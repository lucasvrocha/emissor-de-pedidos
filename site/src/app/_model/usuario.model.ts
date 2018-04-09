export interface Usuario {
	id : number;
	nome : string;
	usuario: string;
	senha: string;
	email : string;
	jwt : string;
	foto : string;
	roles: string[];
}

export class Usuario  implements Usuario {
	constructor(){};
}