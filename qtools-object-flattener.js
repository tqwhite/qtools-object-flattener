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

	const flatten = function(args) {
		const {
		inputItem,
		outObject,
		pathSoFar = '',
		depth = 0,
		nameTransformer = item => item,
		maxDepth=20
	}=args;
		const doRecursion = args => {
			const {
				inputItem,
				outObject,
				pathSoFar = '',
				depth = 0,
				nameTransformer
			} = args; //unused, here for debugging

			return flatten(args);
		};

		const isSimpleType = item =>
			['string', 'number', 'boolean', 'undefined'].indexOf(typeof item) > -1 ||
			item === null;

		if (inputItem instanceof Map || inputItem instanceof Set) {
			throw 'json-flattener only works on arrays and objects, not sets or maps.';
		}

		if (depth > maxDepth) {
			throw `qtools-object-flattener says, Recursed too deeply (${depth} levels, ${maxDepth} allowed; change option.maxDepth)`;
		}

		if (isSimpleType(inputItem)) {
			const func = item => item.replace(/\./g, '_');

			const tmp = pathSoFar.replace(/\./g, '_');

			outObject[nameTransformer(pathSoFar)] = inputItem;
		} else if (inputItem instanceof Array) {
			inputItem.forEach((item, inx) => {
				return doRecursion({...args,
					inputItem: inputItem[inx],
					pathSoFar: `${pathSoFar}[${inx}]`,
					depth: depth + 1
				});
			});
		} else if (inputItem instanceof Object) {
			Object.keys(inputItem).forEach(inx => {
				return doRecursion({...args,
					inputItem: inputItem[inx],
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

	const convert = (inputItem, options = {}, callback) => {

		if (typeof options == 'function') {
			callback = options;
			options = {};
		}

		//const resultString = 'orange';
		const outObject = {};

		flatten({ ...options, inputItem, outObject });

		if (typeof callback == 'function') {
			callback('', outObject); //send outputString to caller
		} else {
			return outObject;
		}
	};

	const convertArray = (inArray, options, callback) => {
		//const resultString = 'orange';
		const outArray = inArray.map(item => convert(item, options));

		if (typeof callback == 'function') {
			callback('', outArray); //send outputString to caller
		} else {
			return outArray;
		}
	};

	return { convert, resurrect, convertArray };
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction();

