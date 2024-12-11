class Extra { 
	constructor(id, receita, nome, ingredientes, preparo) { 
		this.id = id; 
		this.receita = receita; 
		this.nome = nome; 
		this.ingredientes = ingredientes; 
		this.preparo = preparo; 
	} 
	static async buscarExtras(idReceita){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM extra WHERE receita="+idReceita);
		
	}

} 

module.exports = Extra;