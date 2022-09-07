import { expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedSimple = fs.readFileSync(getFixturePath('resultSimple.txt'), 'utf-8').split('\n\n\n');
const expectedNested = fs.readFileSync(getFixturePath('resultNested.txt'), 'utf-8').split('\n\n\n');

const casesSimple = [
  ['simple1.json', 'simple2.json', undefined, expectedSimple[0]],
  ['simple1.yml', 'simple2.yml', undefined, expectedSimple[0]],
  ['simple1.yaml', 'simple2.yaml', 'stylish', expectedSimple[0]],
  ['simple1.yml', 'simple2.yaml', 'stylish', expectedSimple[0]],
  ['simple1.yml', 'simple2.yaml', 'plain', expectedSimple[1]],
  ['simple1.json', 'simple2.yaml', 'plain', expectedSimple[1]],
  ['simple1.json', 'simple2.yaml', 'json', expectedSimple[2]],
  ['simple1.json', 'simple2.yml', 'json', expectedSimple[2]],
];

const casesNested = [
  ['nested1.json', 'nested2.json', undefined, expectedNested[0]],
  ['nested1.yml', 'nested2.yml', undefined, expectedNested[0]],
  ['nested1.yaml', 'nested2.yaml', 'stylish', expectedNested[0]],
  ['nested1.json', 'nested2.yaml', 'stylish', expectedNested[0]],
  ['nested1.yml', 'nested2.json', 'plain', expectedNested[1]],
  ['nested1.yaml', 'nested2.yml', 'plain', expectedNested[1]],
  ['nested1.json', 'nested2.yml', 'json', expectedNested[2]],
  ['nested1.yaml', 'nested2.yml', 'json', expectedNested[2]],
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
