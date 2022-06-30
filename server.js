import * as http from 'http' ;

const server = http.createServer((request, response)=> {
 console.log('headers',request.headers)
 console.log('method',request.method)
 console.log('url',request.url)


const user = {
	name:'john',
	age:35
}
 response.setHeader('content-type','application/json');
 response.end(JSON.stringify(user));
 //response.setHeader('content-type','text/html');
 //response.end('<h1>HELLO!!!!!</h1>');
})

server.listen(3000);