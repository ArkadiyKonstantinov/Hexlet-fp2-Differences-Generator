#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .usage('[options] <filepath1> <filepath2>')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const formatName = `${options.format}`;
    const result = genDiff(filepath1, filepath2, formatName);
    console.log(result);
  });
program.parse();
