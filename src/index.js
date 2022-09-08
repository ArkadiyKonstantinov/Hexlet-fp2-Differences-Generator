import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import genDifferences from './differences.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const parseFile = (filepath) => {
  const fullPath = resolve(process.cwd(), filepath);
  const extName = extname(fullPath).slice(1);
  const data = readFileSync(fullPath);
  return parse(data, extName);
};

export default (path1, path2, formatName = 'stylish') => {
  const parsedFile1 = parseFile(path1);
  const parsedFile2 = parseFile(path2);
  const diff = genDifferences(parsedFile1, parsedFile2);
  return format(diff, formatName);
};
