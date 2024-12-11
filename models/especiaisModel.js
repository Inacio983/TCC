class Especial { 
	constructor(id, medida, ingrediente, caso) { 
		this.id = id; 
		this.medida = medida; 
		this.ingrediente = ingrediente; 
		this.caso = caso;
	} 
	
	static async buscarEspecialNome(ingrediente){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM `especiais` WHERE `ingrediente`='"+ingrediente+"';");
		
	}
	
	static async buscarEspecialMedida(medida){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM `especiais` WHERE `medida`='"+medida+"';");
		
	}

} 

module.exports = Especial;