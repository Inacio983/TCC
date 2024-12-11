const Receita = require('../models/receitaModel'); 
const Extra = require('../models/extraModel'); 
const Peso = require('../models/pesoModel'); 
const Medida = require('../models/medidaModel'); 
const Especial = require('../models/especiaisModel'); 

let receitas = [];

async function getReceitas(req, res) { 
	receitas = await Receita.listarReceitas();
    res.render('home', { receitas }); 
} 

async function getReceita(req, res) {
	let receita = await Receita.buscarReceita(req.params.idReceita);
	let extras = await Extra.buscarExtras(req.params.idReceita);
	let medidas = await Medida.buscarMedidas();
	let extra =[];
	let medindo =[];
	let porcao = req.params.porcao;

	
	//AQUI SEPARA OS EXTRAS
	for(let j=0; j<extras.length; j++){
		let separando = [];
		separando.push(j);
		separando.push(extras[j].nome);
		let ingred_sep = extras[j].ingredientes.split('$');
	    let extra_ingred = [];
		let med2 = [];

		//AQUI SEPARA OS INGREDIENTES
		for(let i=0; i<ingred_sep.length; i++){
			let i_separa = ingred_sep[i];
			i_separa = i_separa.split('&');
			i_separa.unshift(i);
			i_separa[1] = i_separa[1]*porcao;
			let medir = [];

			let ml = await Medida.buscarMedida(i_separa[2]);
			ml = ml[0].mililitros*i_separa[1];
			i_separa.push(ml);
			
			let peso = await Peso.buscarPeso(i_separa[3]);
			peso = peso[0].gramas*ml;
			i_separa.push(peso);

			let espec_n = await Especial.buscarEspecialNome(i_separa[3]);
			espec_n = espec_n[0];
			let espec_m = await Especial.buscarEspecialMedida(i_separa[2]);
			espec_m = espec_m[0];

			//AQUI SEPARA E FILTRA AS MEDIDAS DO INGREDIENTES
			if(espec_n){
				if(espec_n.caso=='inteiro'){
					let med1 = [];
					med1.push(i);
					med1.push(espec_n.medida);
					let mli = await Medida.buscarMedida(espec_n.medida);
					mli = mli[0].mililitros;
					mli = i_separa[4]/mli;
					mli = mli.toFixed(2);
					med1.push(mli);
					med1.push("");
					medir.push(med1);
				};
				
				if(espec_n.caso=='medida'){
					let med1 = [];
					med1.push(i);
					med1.push(espec_n.medida);
					let mli = await Medida.buscarMedida(espec_n.medida);
					mli = mli[0].mililitros;
					mli = i_separa[4]/mli;
					mli = mli.toFixed(2);
					med1.push(mli);
					med1.push("");
					medir.push(med1);
					for(let m=0;m<medidas.length;m++){
					let espec = await Especial.buscarEspecialMedida(medidas[m].nome);
					espec = espec[0];
					if(!espec){
					let meh =[];
					meh.push(i);
					meh.push(medidas[m].nome);
					let mli = medidas[m].mililitros;
					mli = i_separa[4]/mli;
					mli = mli.toFixed(2);
					meh.push(mli);
					meh.push(i_separa[3]);
					medir.push(meh);
					}
					};
					
				};
				//se não for ingrediente especial
			}else{
				for(let m=0;m<medidas.length;m++){
					let med1 = [];
					let espec = await Especial.buscarEspecialMedida(medidas[m].nome);
					espec = espec[0];
					//ingrediente normal medida especial
					if(espec){
						if(espec_m){
							if(espec.medida==espec_m.medida){
							med1.push(i);
							med1.push(medidas[m].nome);
							let mli = medidas[m].mililitros;
							mli = i_separa[4]/mli;
							mli = mli.toFixed(2);
							med1.push(mli);
							med1.push(i_separa[3]);
							medir.push(med1);
							}
						}
					}else{
						med1.push(i);
						med1.push(medidas[m].nome);
						let mli = medidas[m].mililitros;
						mli = i_separa[4]/mli;
						mli = mli.toFixed(2);
						med1.push(mli);
						med1.push(i_separa[3]);
						medir.push(med1);
					};
				};//FIM DO FOR MEDIDAS
			};

			med2.push(medir);

			extra_ingred.push(i_separa);

		}//FIM DO SEPARADOR DE INGREDIENTES

		separando.push(extra_ingred);

			medindo.push(med2);

		
		let prep_sep = extras[j].preparo.split('$');
		separando.push(prep_sep);

		extra.push(separando);

	}//FIM DO FOR EXTRAS


    if(receita.length > 0){
		receita=receita[0];
		res.render('receita', { receita, extra, medindo, porcao });
	}else{
		res.render('404');
	};
     
} 





module.exports = { 
	getReceitas,
    getReceita
};