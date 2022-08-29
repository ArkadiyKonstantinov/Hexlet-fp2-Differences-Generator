import { expect } from '@jest/globals';
import getDiff from '../src/index.js';

const result = '{\n\t- follow: false\n\t  host: hexlet.io\n\t- proxy: 123.234.53.22\n\t- timeout: 50\n\t+ timeout: 20\n\t+ verbose: true\n}';
const path1 = '__fixtures__/file1.json';
const path2 = '__fixtures__/file2.json';

test('gendiff', () => {
  expect(getDiff(path1, path2)).toEqual(result);
});
