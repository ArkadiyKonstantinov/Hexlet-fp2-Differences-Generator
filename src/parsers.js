import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const format = path.extname(fullPath);
  const data = fs.readFileSync(fullPath);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};
