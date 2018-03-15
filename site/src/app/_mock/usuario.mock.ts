import { Usuario } from '../_model/usuario.model';

export const USUARIO: Usuario[] = [
	{
		"id" : 1, 
		"nome" : "Lucas Vieira Rocha", 
		"usuario" : "lucas.rocha",
		"senha" : "lucas",
		"adm" : true, 
		"email" : "lucas.rocha@edp.com.br",
		"jwt" : undefined,
		"foto" : "https://dummyimage.com/150x150/254853/ededed.gif&text=LR"
	},
	{
		"id" : 2, 
		"nome" : "Mayara Vidal", 
		"usuario" : "mayara.vidal",
		"senha" : "mayara",
		"adm" : true, 
		"email" : "mayara.vidal@edp.com.br",
		"jwt" : undefined,
		"foto" : "https://dummyimage.com/150x150/254853/ededed.gif&text=MV"
	},
	{
		"id" : 3, 
		"nome" : "Clerivaldo da Silva", 
		"usuario" : "clerivaldo.silva",
		"senha" : "clerivaldo",
		"adm" : false, 
		"email" : "clerivaldo.silva@edp.com.br",
		"jwt" : undefined,
		"foto" : "https://dummyimage.com/150x150/254853/ededed.gif&text=CS"
	}
]