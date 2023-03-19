import express 	from 'express';
import path 	from 'path';


const app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

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
	res.render('index.ejs', { title: 'InterpreteTS - JISON', message: 'Vista procesada correctamente con EJS!' });
});


