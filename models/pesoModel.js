class Peso { 
	constructor(id, nome, gramas) { 
		this.id = id; 
		this.nome = nome; 
		this.gramas = gramas; 
	} 
	
	static async buscarPeso(nome){
		const Database= require('./Database');
		return await Database.query("SELECT `gramas` FROM `peso` WHERE `nome`='"+nome+"';");
		
	}

} 

module.exports = Peso;