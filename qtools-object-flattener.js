#!/usr/bin/env node
'use strict';

const qt = require('qtools-functional-library');

const util = require('util');

//START OF moduleFunction() ============================================================

const moduleFunction = function(args = {}) {
	const writeHelp = (inString, err = '') => {
		console.log();
	};
	
	//FLATTEN ============================================================

	const flatten = function({ inputItem, outArray, pathSoFar = '', depth = 0 }) {
		const doRecursion = args => {
			const { inputItem, outArray, pathSoFar = '', depth = 0 } = args; //unused, here for debugging

			return flatten(args);
		};

		const isSimpleType = item =>
			['string', 'number', 'boolean', 'undefined'].indexOf(typeof item) > -1 ||
			item === null;

		if (inputItem instanceof Map || inputItem instanceof Set) {
			throw 'json-flattener only works on arrays and objects, not sets or maps.';
		}

		if (depth > 5) {
			console.error(`depth=${depth}`);

			throw 'too deep';
		}
		
		if (isSimpleType(inputItem)) {
			outArray[pathSoFar] = inputItem;
		} else if (inputItem instanceof Array) {
			inputItem.forEach((item, inx) => {
				return doRecursion({
					inputItem: inputItem[inx],
					outArray,
					pathSoFar: `${pathSoFar}[${inx}]`,
					depth: depth + 1
				});
			});
		} else if (inputItem instanceof Object) {
			Object.keys(inputItem).forEach(inx => {
				return doRecursion({
					inputItem: inputItem[inx],
					outArray,
					pathSoFar: `${pathSoFar}${pathSoFar ? '.' : ''}${inx}`,
					depth: depth + 1
				});
			});
		}
	};
	
	const resurrect = flatItem => {
		//resurrect only works for objects, not top level arrays
		let outObj = {};
		Object.keys(flatItem).forEach(name =>
			outObj.qtPutSurePath(name, flatItem[name])
		);
		return outObj;
	};
	
	
	//EXECUTE ============================================================

	const convert = (inputItem, callback) => {
		//const resultString = 'orange';
		const outArray = {};

		flatten({ inputItem, outArray });
		
		if (typeof(callback)=='function'){
		callback('', outArray); //send outputString to caller
		}
		else{
			return outArray;
		}
	};
	
	
	
	return { convert, resurrect };
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction();

