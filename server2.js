import express from 'express';
import bodyParser from "body-parser";

const app = express();

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);


const __dirname = path.dirname(__filename);


// 👇️ "/home/borislav/Desktop/javascript/dist/index.html"


app.use(express.static(__dirname + '/public'))
/*
app.use((req, res, next) => {
	console.log('halo')
	next();
})
*/
/*
app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.get('/:id' , (req, res) => {
   //console.log(req.query);
   //req.body 
   //req.header
   console.log(req.params)
   
	res.status(404).send('not found');
})*/




/*app.post('/', (req, res) => {
	//res.send('<h1>hello</h1>');
	console.log(req.body)
	const user = {
		name:'sam',
		age:20
	}

	//res.send(user);
   res.send('success');
})*/
app.listen(3000);