#!/usr/bin/env node
import { Command } from 'commander';

const gendiff = new Command();
gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .usage('[options] <filepath1> <filepath2>')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format');
gendiff.parse(process.argv);
