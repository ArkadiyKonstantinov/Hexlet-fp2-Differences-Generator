import { expect } from '@jest/globals';
import getDiff from '../src/index.js';

const result = '{\n\t- follow: false\n\t  host: hexlet.io\n\t- proxy: 123.234.53.22\n\t- timeout: 50\n\t+ timeout: 20\n\t+ verbose: true\n}';
const pathJSON1 = '__fixtures__/file1.json';
const pathJSON2 = '__fixtures__/file2.json';
const pathYml1 = '__fixtures__/file1.yml';
const pathYml2 = '__fixtures__/file2.yml';
const pathYaml1 = '__fixtures__/file1.yaml';
const pathYaml2 = '__fixtures__/file2.yaml';

test('gendiff .json files', () => {
  expect(getDiff(pathJSON1, pathJSON2)).toEqual(result);
});

test('gendiff .yml files', () => {
  expect(getDiff(pathYml1, pathYml2)).toEqual(result);
});

test('gendiff .yaml files', () => {
  expect(getDiff(pathYaml1, pathYaml2)).toEqual(result);
});

test('gendiff difrent file types', () => {
  expect(getDiff(pathJSON1, pathYml2)).toEqual(result);
  expect(getDiff(pathJSON1, pathYaml2)).toEqual(result);
  expect(getDiff(pathYml1, pathJSON2)).toEqual(result);
  expect(getDiff(pathYaml1, pathJSON2)).toEqual(result);
});
