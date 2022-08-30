import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const fileExtname = path.extname(fullPath);
  const data = fs.readFileSync(fullPath);
  let obj = {};
  if (fileExtname === '.json') {
    obj = JSON.parse(data);
  } else if (fileExtname === '.yml' || fileExtname === '.yaml') {
    obj = yaml.load(data);
  }
  return obj;
};
