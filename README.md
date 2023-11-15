# qtools-object-flattener

Collapses JS complex, multi-level JS object to <u>single level </u>object with dotted path property names.



Is useful for puttting Javascript objects into relational databases when you don't want to use a JSON field type. Column names become dotted.paths. Also for analysis of complicated objects.



Also consider qtools-functional-library with its objectInstance.getSurePath('some.dotted.path') and objectInstance.putDottedPath('another.path', value)

## Usage:

#### **Flatten an object**

    const jsonFlattener = require('qtools-object-flattener');
    
    const flatObject=jsonFlattener.convert(someObject, [options], [callback]);

Works when executed on an Array but it doesn't make too much sense.

Without a callback, the result is returned.

#### **Flatten an array of objects**

    const flatArray=jsonFlattener.convertArray(someArrayOfObjects, [options], [callback]); 

#### **Optional parameters in the options parameter object.**

**nameTransformer** - a function that operates on the generated, dotted path in any way that is useful and produces a new string
**maxDepth**        - recursion limit, default is 20

**EG,**

    const flatArray=jsonFlattener.convertArray(someArrayOfObjects, {nameTransformer:dottedPath>dottedPath.replace(/\./g, '\_')}); 
    
    const flatObject=jsonFlattener.convert(someObject, {nameTransformer:dottedPath=>dottedPath.replace(/\./g, '\_')});

#### **The closest there is to a test is:**

npm run demo

Which has examples of the main function as illustrated below.

### Examples:

#### **Flattening an object:**

    const flatObject=jsonFlattener.convert(someObject);

`someObject={
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
}`

`**Flattens to:**`

`const flatObject={
  name: 'TQ White II',
  'tv1.brand': 'Sony',
  'tv1.inches': 60,
  'tv1.internet': true,
  'websites[0]': 'https://tqwhite.com',
  'websites[1]': 'https://tech.genericWhite.com',
  'websites[2]': 'https://jsLightning.com'
}`

#### **Flattening an array of objects into an array of flattened objects**

    const flatObject=jsonFlattener.convert(someObject);

`const someArray = [
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
];`

**Flattens to:**

`const flattenedArray=[
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
  ]`

**Change Log**



v1.0.4 Updated README only. No code changes.