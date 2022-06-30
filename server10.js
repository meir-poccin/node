import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
//import {handleRegister} from './controller/register.js';


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
});

//console.log(db.select('*').from('users'));
	
//db.select('*').from('users');

db.select('*').from('users').then(data => {
	//console.log(data);
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


	

app.get('/', (req, res)=>{
	res.send('it is working');
})

app.post('/signin', (req, res)=>{
	const {email,  password} = req.body;
	if(!email  || !password) {
		return res.status(400).json('not found');
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', req.body.email)
	.then(data => {
	const valid =bcrypt.compareSync(req.body.password, 
			data[0].hash);
	
	if(valid){
	return db.select('*').from('users')
		.where('email', '=', req.body.email)
		.then(user => {
			res.json(user[0])
		})
        .catch(err => res.status(400).json('unable to get user'))
	  }else{
	  res.status(400).json('wrong password')
	  }
	})
	.catch(err => res.status(400).json('wrong passsword'))
})

app.post('/register', (req,res) => {
	//register.handleRegister(req, res, db, bcrypt)
	const {email, name, password} = req.body;
	if(!email || !name || !password) {
		return res.status(400).json('fill form');
	}
	
/*	bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
});*/
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
    	trx.insert({
    		hash: hash,
    		email: email
    	})
    	.into('login')
    	.returning('email')
    	.then(loginEmail => {
    		return trx('users')
    		.returning('*')
    		.insert({
			email:loginEmail[0].email,
			name:name,
			joined: new Date()
	  } )
	.then(user => {
	res.json(user[0]);	
	})
   })
    .then(trx.commit)
    .catch(trx.rollback)
  })
	.catch(err => res.status(400).json('unable to register'))
})


app.get('/profile/:id', (req, res)=>{
	const {id} = req.params;
	//let found = false;
	db.select('*').from('users').where({ id})
	.then(user => {
		//console.log(user)
		if(user.length){
		res.json(user[0])
	}else{
		res.status(400).json('error not found!!!')
	}
	})
	.catch(err => res.status(400).json('not found!!!'))
	/*if(!found){
		res.status(400).json('not found');
	}*/
})



app.put('/image', (req,res) =>{
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get count'))
})
/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/
app.listen(3000, () => {
	console.log('app running now 3000');
})