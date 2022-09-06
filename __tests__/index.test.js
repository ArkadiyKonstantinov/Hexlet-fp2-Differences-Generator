import { expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedData = fs.readFileSync(getFixturePath('result.txt'), 'utf-8').split('\n\n\n');

const casesSimple = [
  ['simple1.json', 'simple2.json', undefined, expectedData[0]],
  ['simple1.yml', 'simple2.yml', undefined, expectedData[0]],
  ['simple1.yaml', 'simple2.yaml', 'stylish', expectedData[0]],
  ['simple1.yml', 'simple2.yaml', 'stylish', expectedData[0]],
  ['simple1.yml', 'simple2.yaml', 'plain', expectedData[1]],
  ['simple1.json', 'simple2.yaml', 'plain', expectedData[1]],
];

const casesNested = [
  ['nested1.json', 'nested2.json', undefined, expectedData[2]],
  ['nested1.yml', 'nested2.yml', undefined, expectedData[2]],
  ['nested1.yaml', 'nested2.yaml', 'stylish', expectedData[2]],
  ['nested1.json', 'nested2.yaml', 'stylish', expectedData[2]],
  ['nested1.yml', 'nested2.json', 'plain', expectedData[3]],
  ['nested1.yaml', 'nested2.yml', 'plain', expectedData[3]],
];

describe.each(casesSimple)('genDiff simple files', (file1, file2, format, expected) => {
  const path1 = getFixturePath(file1);
  const path2 = getFixturePath(file2);
  test(`File ${file1} and file ${file2} with formater ${format}`, () => expect(genDiff(path1, path2, format)).toEqual(expected));
});

describe.each(casesNested)('genDiff nested files', (file1, file2, format, expected) => {
  const path1 = getFixturePath(file1);
  const path2 = getFixturePath(file2);
  test(`File ${file1} and file ${file2} with formater ${format}`, () => expect(genDiff(path1, path2, format)).toEqual(expected));
});
