class Medida { 
	constructor(id, nome, mililitros) { 
		this.id = id; 
		this.nome = nome; 
		this.mililitros = mililitros; 
	} 
	
	static async buscarMedidas(){
		const Database= require('./Database');
		return await Database.query("SELECT * FROM medida;");
		
	}
	
	static async buscarMedida(nome){
		const Database= require('./Database');
		return await Database.query("SELECT `mililitros` FROM `medida` WHERE `nome`='"+nome+"';");
		
	}

} 

module.exports = Medida;