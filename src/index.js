import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import parseFile from './parsers.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const format = path.extname(fullPath);
  const data = fs.readFileSync(fullPath);
  return { data, format };
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
      if (bothObject) {
        const type = 'nested';
        const curentLeft = _.cloneDeep(left[key]);
        const curentRight = _.cloneDeep(right[key]);
        const value = genDifferencesTree(curentLeft, curentRight);
        return { ...acc, [key]: { type, value } };
      }
      if (!isLeft) {
        const type = 'added';
        const value = _.cloneDeep(right[key]);
        return { ...acc, [key]: { type, value } };
      }
      if (!isRight) {
        const type = 'removed';
        const value = _.cloneDeep(left[key]);
        return { ...acc, [key]: { type, value } };
      }
      if (isLeft && isRight && !isEqual) {
        const type = 'updated';
        const old = _.cloneDeep(left[key]);
        const updated = _.cloneDeep(right[key]);
        const value = { old, updated };
        return { ...acc, [key]: { type, value } };
      }
      if (isLeft && isRight && isEqual) {
        const type = 'equal';
        const value = _.cloneDeep(left[key]);
        return { ...acc, [key]: { type, value } };
      }
      return { ...acc };
    }, {});
};

const stylish = (differences, replacer = ' ', spacesCount = 2) => {
  const stringify = (currentValue, level = 1) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const prefixSize = spacesCount * level;
    const start = '{';
    const currentIndent = `${replacer.repeat(prefixSize)}`;
    const end = `${replacer.repeat(prefixSize - spacesCount)}}`;
    const keys = Object.keys(currentValue);
    const strings = keys
      .map((key) => `${currentIndent}${key}: ${stringify(currentValue[key], level + 1)}`);
    return [start, ...strings, end].join('\n');
  };

  const iter = (currentDiff, level = 1) => {
    const keys = Object.keys(currentDiff).sort();
    const prefixSize = spacesCount * level;
    const start = '{';
    const currentIndent = `${replacer.repeat(prefixSize)}`;
    const end = `${replacer.repeat(prefixSize - spacesCount)}}`;
    const lines = keys
      .flatMap((key) => {
        const diff = currentDiff[key];
        switch (diff.type) {
          case 'nested': {
            const prefix = '  ';
            return [`${currentIndent}${prefix}${key}: ${iter(diff.value, level + 1)}`];
          }
          case 'added': {
            const prefix = '+ ';
            return [`${currentIndent}${prefix}${key}: ${stringify(diff.value, level + 1)}`];
          }
          case 'removed': {
            const prefix = '- ';
            return [`${currentIndent}${prefix}${key}: ${stringify(diff.value, level + 1)}`];
          }
          case 'updated': {
            const { old, updated } = diff.value;
            const prefixOld = '- ';
            const prifixUpdatet = '+ ';
            return [`${currentIndent}${prefixOld}${key}: ${stringify(old, level + 1)}`,
              `${currentIndent}${prifixUpdatet}${key}: ${stringify(updated, level + 1)}`];
          }
          case 'equal': {
            const prefix = '  ';
            return [`${currentIndent}${prefix}${key}: ${stringify(diff.value, level + 1)}`];
          }
          default:
            return [];
        }
      });
    return [start, ...lines, end].join('\n');
  };
  return iter(differences, 1);
};

export default (path1, path2, format = 'stylish') => {
  const obj1 = parseFile(readFile(path1));
  const obj2 = parseFile(readFile(path2));
  let formater;
  if (format === 'stylish') {
    formater = stylish;
  }
  return formater(genDifferencesTree(obj1, obj2));
};
