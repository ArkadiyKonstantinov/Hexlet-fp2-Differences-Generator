import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import yaml from 'js-yaml';

// const readFile = (filePath) => {
//   const fullPath = path.resolve(process.cwd(), filePath);
//   const data = fs.readFileSync(fullPath).toString();
//   return data;
// };

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).sort();
  const diff = keys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const diffObj2 = `\t- ${key}: ${value1}`;
    const diffObj1 = `\t+ ${key}: ${value2}`;
    const noDiff = `\t  ${key}: ${value1}`;
    if (value2 === undefined) {
      return [...acc, diffObj2];
    }
    if (value1 === undefined) {
      return [...acc, diffObj1];
    }
    if (value1 === value2) {
      return [...acc, noDiff];
    }
    return [...acc, diffObj2, diffObj1];
  }, []);
  return `{\n${diff.join('\n')}\n}`;
};

export default (path1, path2) => {
  const fullPath1 = path.resolve(process.cwd(), path1);
  const fileExtname1 = path.extname(fullPath1);
  const data1 = fs.readFileSync(fullPath1);
  let obj1 = {};
  if (fileExtname1 === '.json') {
    obj1 = JSON.parse(data1);
  } else if (fileExtname1 === '.yml' || fileExtname1 === '.yaml') {
    obj1 = yaml.load(data1);
  }

  const fullPath2 = path.resolve(process.cwd(), path2);
  const fileExtname2 = path.extname(fullPath2);
  const data2 = fs.readFileSync(fullPath2);
  let obj2 = {};
  if (fileExtname2 === '.json') {
    obj2 = JSON.parse(data2);
  } else if (fileExtname2 === '.yml' || fileExtname2 === '.yaml') {
    obj2 = yaml.load(data2);
  }

  return getDiff(obj1, obj2);
};
