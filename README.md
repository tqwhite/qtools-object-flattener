# qtools-object-flattener

Collapses JS complex, multi-level JS object to single level object with dotted path property names

### Usage:

**//flattens input. Works for an array but does not make much sense**
const jsonFlattener = require('qtools-object-flattener');
const flatObject=jsonFlattener.convert(someObject);

const sameAsOriginal=jsonFlatter.resurrect(flatObject);



**//does not convert top level array, returns an array of flattened objects**
const flatArray=jsonFlattener.convertArray(someArrayOfObjects); 



**The closest there is to a test is:**

npm run demo

Which has examples of the main function as illustrated below.

### Examples:

**Flattening an object:**

    const flatObject=jsonFlattener.convert(someObject);

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

**Flattens to:**

const flatObject={
  name: 'TQ White II',
  'tv1.brand': 'Sony',
  'tv1.inches': 60,
  'tv1.internet': true,
  'websites[0]': 'https://tqwhite.com',
  'websites[1]': 'https://tech.genericWhite.com',
  'websites[2]': 'https://jsLightning.com'
}

**Flattening an array of objects into an array of flattened objects**

    const flatObject=jsonFlattener.convert(someObject);

const someArray = [
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

**Flattens to:**

const flattenedArray=[
    {
      name: 'TQ White II',
      'tv1.brand': 'Sony',
      'tv1.inches': 60,
      'tv1.internet': true,
      'websites[0]': 'https://tqwhite.com',
      'websites[1]': 'https://tech.genericWhite.com',
      'websites[2]': 'https://jsLightning.com'
    },
    {
      name: 'Debbie White',
      'tv1.brand': 'Sony',
      'tv1.inches': 60,
      'tv1.internet': true,
      'websites[0]': 'https://tqwhite.com',
      'websites[1]': 'https://tech.genericWhite.com',
      'websites[2]': 'https://jsLightning.com'
    }
  ]