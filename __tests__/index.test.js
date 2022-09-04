import { expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const casesPlane = [
  ['plane1.json', 'plane2.json'],
  ['plane1.yml', 'plane2.yml'],
  ['plane1.yaml', 'plane2.yaml'],
  ['plane1.yml', 'plane2.yaml'],
  ['plane1.json', 'plane2.yaml'],
];

const casesNested = [
  ['nested1.json', 'nested2.json'],
  ['nested1.yml', 'nested2.yml'],
  ['nested1.yaml', 'nested2.yaml'],
  ['nested1.yml', 'nested2.yaml'],
  ['nested1.json', 'nested2.yaml'],
];

const expectedPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');
const expectedNested = fs.readFileSync(getFixturePath('resultNested.txt'), 'utf-8');

describe.each(casesPlane)('plane', (file1, file2) => {
  const path1 = getFixturePath(file1);
  const path2 = getFixturePath(file2);
  test('plain object', () => expect(genDiff(path1, path2)).toEqual(expectedPlain));
});

describe.each(casesNested)('nested', (file1, file2) => {
  const path1 = getFixturePath(file1);
  const path2 = getFixturePath(file2);
  test('nested object', () => expect(genDiff(path1, path2)).toEqual(expectedNested));
});
