import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import formatter from '../formatters/index.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const extName = path.extname(fullPath);
  const data = fs.readFileSync(fullPath);
  return { data, extName };
};

const genDifferencesTree = (left, right) => {
  const keys1 = Object.keys(left);
  const keys2 = Object.keys(right);
  const keys = _.union(keys1, keys2);
  return keys
    .reduce((acc, key) => {
      const isLeft = Object.hasOwn(left, key);
      const isRight = Object.hasOwn(right, key);
      const isEqual = Object.is(left[key], right[key]);
      const bothObject = _.isObject(left[key]) && _.isObject(right[key]);
      let result;
      if (!isLeft) {
        const type = 'added';
        const value = _.cloneDeep(right[key]);
        result = { ...acc, [key]: { type, value } };
      }
      if (!isRight) {
        const type = 'removed';
        const value = _.cloneDeep(left[key]);
        result = { ...acc, [key]: { type, value } };
      }
      if (isLeft && isRight && !isEqual) {
        const type = 'updated';
        const old = _.cloneDeep(left[key]);
        const updated = _.cloneDeep(right[key]);
        const value = { old, updated };
        result = { ...acc, [key]: { type, value } };
      }
      if (isLeft && isRight && isEqual) {
        const type = 'equal';
        const value = _.cloneDeep(left[key]);
        result = { ...acc, [key]: { type, value } };
      }
      if (bothObject) {
        const type = 'nested';
        const curentLeft = _.cloneDeep(left[key]);
        const curentRight = _.cloneDeep(right[key]);
        const value = genDifferencesTree(curentLeft, curentRight);
        result = { ...acc, [key]: { type, value } };
      }
      return result;
    }, {});
};

export default (path1, path2, formatName = 'stylish') => {
  const obj1 = parse(readFile(path1));
  const obj2 = parse(readFile(path2));
  const diff = genDifferencesTree(obj1, obj2);
  return formatter(diff, formatName);
};
