const express = require('express'); 
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

const receitaController = require('./controllers/receitaController'); 

const app = express(); 
const port = 4000;

//Arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

//Define o template engine
app.use(expressLayouts);
app.set('layout', './layouts/default/index')
app.set('view engine', 'ejs'); 

app.use(express.urlencoded({ extended: true })); 
 
app.use(session({secret:'i1n2f3o4'}));

app.use((req, res, next) => {
	
	
    app.set('layout', './layouts/default/index');
    res.locals.layoutVariables = {
        url : process.env.URL,
        img : "/img/",
        style : "/css/",
        title: 'Receitas' 
    };
    next();
});

//ROTA

app.get('/', receitaController.getReceitas); 

app.get('/home', (req,res)=>{ 
	
	res.render('home');	
});


app.get('/receita/:idReceita/:porcao', (req,res)=>{ 
	receitaController.getReceita(req,res);
});


app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
    });