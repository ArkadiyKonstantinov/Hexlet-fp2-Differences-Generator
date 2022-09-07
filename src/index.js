import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const extName = path.extname(fullPath);
  const data = fs.readFileSync(fullPath);
  return { data, extName };
};

const genDifferences = (left, right) => {
  const keys = _.union(Object.keys(left), Object.keys(right));
  return keys
    .reduce((acc, key) => {
      if (_.isObject(left[key]) && _.isObject(right[key])) {
        const value = genDifferences(_.cloneDeep(left[key]), _.cloneDeep(right[key]));
        return { ...acc, [key]: { type: 'nested', value } };
      }
      if (!Object.hasOwn(left, key)) {
        const value = _.cloneDeep(right[key]);
        return { ...acc, [key]: { type: 'added', value } };
      }
      if (!Object.hasOwn(right, key)) {
        const value = _.cloneDeep(left[key]);
        return { ...acc, [key]: { type: 'removed', value } };
      }
      if (!Object.is(left[key], right[key])) {
        const value = { old: _.cloneDeep(left[key]), updated: _.cloneDeep(right[key]) };
        return { ...acc, [key]: { type: 'updated', value } };
      }
      const value = _.cloneDeep(left[key]);
      return { ...acc, [key]: { type: 'equal', value } };
    }, {});
};

export default (path1, path2, formatName = 'stylish') => {
  const obj1 = parse(readFile(path1));
  const obj2 = parse(readFile(path2));
  const diff = genDifferences(obj1, obj2);
  return format(diff, formatName);
};
