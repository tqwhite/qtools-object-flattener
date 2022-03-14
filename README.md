# qtools-object-flattener
Collapses JS complex, multi-level JS object to single level object with dotted path property names

Usage:

const jsonFlattener = require('qtools-object-flattener');
const flatObject=jsonFlattener.convert(someObject);

const sameAsOriginal=jsonFlatter.resurrect(flatObject);

EG,

someObject={
	name: 'TQ White II',
	tv1:{
		brand: 'Sony',
		inches: 60,
		internet: true
	},
	websites:[
		'https://tqwhite.com',
		'https://tech.genericWhite.com',
		'https://jsLightning.com'
	]
}

Flattens to:

flatObject={
  name: 'TQ White II',
  'tv1.brand': 'Sony',
  'tv1.inches': 60,
  'tv1.internet': true,
  'websites[0]': 'https://tqwhite.com',
  'websites[1]': 'https://tech.genericWhite.com',
  'websites[2]': 'https://jsLightning.com'
}
