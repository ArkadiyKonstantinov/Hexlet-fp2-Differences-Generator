import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';

const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const extName = path.extname(fullPath).slice(1);
  const data = fs.readFileSync(fullPath);
  return parse(data, extName);
};

const genDifferences = (left, right) => {
  const keys = _.union(Object.keys(left), Object.keys(right)).sort();
  return keys
    .map((key) => {
      const leftValue = _.cloneDeep(left[key]);
      const rightValue = _.cloneDeep(right[key]);
      if (_.isObject(left[key]) && _.isObject(right[key])) {
        return { key, type: 'nested', children: genDifferences(left[key], right[key]) };
      }
      if (!Object.hasOwn(left, key)) {
        return { key, type: 'added', value: rightValue };
      }
      if (!Object.hasOwn(right, key)) {
        return { key, type: 'removed', value: leftValue };
      }
      if (!Object.is(left[key], right[key])) {
        return {
          key, type: 'updated', old: leftValue, updated: rightValue,
        };
      }
      return { key, type: 'equal', value: leftValue };
    });
};

export default (path1, path2, formatName = 'stylish') => {
  const obj1 = parseFile(path1);
  const obj2 = parseFile(path2);
  const diff = genDifferences(obj1, obj2);
  return format(diff, formatName);
};
