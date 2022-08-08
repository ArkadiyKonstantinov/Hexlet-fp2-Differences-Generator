#!/usr/bin/env node
import { Command } from 'commander';

const gendiff = new Command();
gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');
gendiff.parse();
