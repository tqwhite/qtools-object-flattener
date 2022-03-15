#!/usr/local/bin/node
'use strict';

const objectFlattener = require('./qtools-object-flattener.js');

const testObject = {
	name: 'TQ White II',
	tv1: {
		brand: 'Sony',
		inches: 60,
		internet: true
	},
	websites: [
		'https://tqwhite.com',
		'https://tech.genericWhite.com',
		'https://jsLightning.com'
	]
};

const testArray = [
	{
		name: 'TQ White II',
		tv1: {
			brand: 'Sony',
			inches: 60,
			internet: true
		},
		websites: [
			'https://tqwhite.com',
			'https://tech.genericWhite.com',
			'https://jsLightning.com'
		]
	},
	{
		name: 'Debbie White',
		tv1: {
			brand: 'Sony',
			inches: 60,
			internet: true
		},
		websites: [
			'https://tqwhite.com',
			'https://tech.genericWhite.com',
			'https://jsLightning.com'
		]
	}
];

const result1 = objectFlattener.convert(testObject);

const result2 = objectFlattener.convert(testArray);

const result3 = objectFlattener.convertArray(testArray);

const result4 = objectFlattener.convertArray(testArray, {nameTransformer:dottedPath=>dottedPath.replace(/\./g, '_')});

console.log(`\nCONVERTING AN OBJECT  ========================= [demo.js.]`);
console.log(
	`objectFlattener.convert(testObject)  ========================= [demo.js.]\n`
);
console.dir({ ['SOURCE DATA testObject']: testObject }, { depth: 2 });

console.dir({ ['result1']: result1 }, { depth: 2 });

console.log(`\nCONVERTING AN ARRAY  ========================= [demo.js.]`);
console.log(
	`objectFlattener.convert(testArray)  ========================= [demo.js.]`
);
console.dir({ ['SOURCE DATA testArray']: testArray }, { depth: 2 });

console.dir({ ['result2']: result2 }, { depth: 2 });

console.log(
	`\nCONVERTING ELEMENTS OF AN ARRAY  ========================= [demo.js.]`
);
console.log(
	`objectFlattener.convertArray(testArray)  ========================= [demo.js.]`
);
console.dir({ ['SOURCE DATA testArray']: testArray }, { depth: 2 });

console.dir({ ['result3']: result3 }, { depth: 2 }); 

console.log(
	`\nCONVERTING ELEMENTS OF AN ARRAY  WITH TRANSFORMATION (REPLACE DOTS WITH UNDERSCORE {nameTransformer:dottedPath=>dottedPath.replace(/\./g, '_')}) ========================= [demo.js.]`
);
console.log(
	`objectFlattener.convertArray(testArray)  ========================= [demo.js.]`
);
console.dir({ ['SOURCE DATA testArray']: testArray }, { depth: 2 });

console.dir({ ['result4']: result4 }, { depth: 2 }); 

