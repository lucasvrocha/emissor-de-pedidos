import { Usuario } from '../_model/usuario.model';

export const USUARIO: Usuario[] = [
	{
		"id" : 1, 
		"nome" : "Lucas Vieira Rocha", 
		"usuario" : "lucas.rocha",
		"senha" : "lucas",
		"roles" : ["seller","admin"], 
		"email" : "lucas.rocha@edp.com.br",
		"jwt" : undefined,
		"foto" : "https://dummyimage.com/150x150/254853/ededed.gif&text=LR"
	},
	{
		"id" : 2, 
		"nome" : "Mayara Vidal", 
		"usuario" : "mayara.vidal",
		"senha" : "mayara",
		"roles" : ["admin"], 
		"email" : "mayara.vidal@edp.com.br",
		"jwt" : undefined,
		"foto" : "https://dummyimage.com/150x150/254853/ededed.gif&text=MV"
	},
	{
		"id" : 3, 
		"nome" : "Clerivaldo da Silva", 
		"usuario" : "clerivaldo.silva",
		"senha" : "clerivaldo",
		"roles" : ["seller"], 
		"email" : "clerivaldo.silva@edp.com.br",
		"jwt" : undefined,
		"foto" : "https://dummyimage.com/150x150/254853/ededed.gif&text=CS"
	},
	{
		"id" : 4, 
		"nome" : "Leonardo Fatec", 
		"usuario" : "leonardo.fatec",
		"senha" : "leonardo",
		"roles" : ["seller"], 
		"email" : "leonardo.fatec@edp.com.br",
		"jwt" : undefined,
		"foto" : "https://dummyimage.com/150x150/254853/ededed.gif&text=LF"
	},
	{
		"id" : 5, 
		"nome" : "Alessandro Fatec", 
		"usuario" : "alessandro.fatec",
		"senha" : "alessandro",
		"roles" : ["seller"], 
		"email" : "alessandro.fatec@edp.com.br",
		"jwt" : undefined,
		"foto" : "https://dummyimage.com/150x150/254853/ededed.gif&text=AF"
	}

]