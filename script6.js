import fs from 'fs';

/*
fs.readFile('hello.txt', (err, data) =>{
	if(err){
		console.log('errorrr');
	}
	console.log(data);
})
*/
//const file = fs.readFileSync('./hello.txt');

//console.log(file);

fs.appendFile('./hello.txt', 'yes', err => {
    if(err){
    	console.log(err);
    }
 })
