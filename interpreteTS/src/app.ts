import express 		from 'express';
import path 		from 'path';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import { Analizador } from './Analizador/Analizador';
import { AST } from './Entorno/AST';

const app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
console.log(__dirname);
app.use(express.static(path.join(__dirname, '../public')));



// ===================================== RUTAS
app.listen(port, err => {
    if (err) {
    	return console.error(err);
    }
    return console.log(`Servidor funcionando en puerto: ${port}`);
});


app.get('/status', (req, res) => {
	res.send('El servicio express esta funcionando OK !!');
});

app.get('/', (req, res) => {
	res.render('index.ejs', { title: 'InterpreteTS - JISON', salida: '', codigo:""});
});

app.post('/ejecutar', (req, res) => {
    
    let cadena_codigo = req.body.codigo;
    let analizador = new Analizador(cadena_codigo, "editor");
    let ast: AST = analizador.Analizar();
    if(ast != undefined) {
        res.render('index.ejs', { title: 'InterpreteTS - JISON', salida: ast.getSalida(), codigo: cadena_codigo});
    } else{
        res.render('index.ejs', { title: 'InterpreteTS - JISON', salida: 'ERROR al procesar cadena', codigo: cadena_codigo});
    }
});


