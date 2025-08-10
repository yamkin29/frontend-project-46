#!/usr/bin/env node

import { Command } from 'commander'
import pkg from '../package.json' with { type: 'json' }

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version(pkg.version, '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')

program.parse()
