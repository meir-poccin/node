import {largeNumber } from './script3.mjs'

const a = largeNumber;
const b = 5;
setTimeout(() => {
	console.log(a+b);
}, 3000)