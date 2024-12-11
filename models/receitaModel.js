class Receita { 
	constructor(id, nome, descricao, imagem, porcoes) { 
		this.id = id; 
		this.nome = nome; 
		this.descricao = descricao; 
		this.imagem = imagem; 
		this.porcoes = porcoes; 
	} 

	static async listarReceitas(){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM receita;");
		
	}
    
	static async buscarReceita(idReceita){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM receita WHERE id_receita="+idReceita);
		
	}

} 

module.exports = Receita;