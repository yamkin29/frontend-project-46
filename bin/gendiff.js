#!/usr/bin/env node

import { Command } from 'commander'
import { createRequire } from 'node:module'
import genDiff from '../src/index.js'

const require = createRequire(import.meta.url)
const { version } = require('../package.json')

const program = new Command()

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version(version, '-V, --version', 'output the version number')
    .helpOption('-h, --help', 'display help for command')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action((filepath1, filepath2, options) => {
        const result = genDiff(filepath1, filepath2, options.format)
        if (result) console.log(result)
    })

program.parse()
