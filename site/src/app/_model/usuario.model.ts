export interface Usuario {
	id : number;
	nome : string;
	usuario: string;
	senha: string;
	email : string;
	adm : boolean;
	jwt : string;
	foto : string;
}

export class Usuario  implements Usuario {
	constructor(){};
}