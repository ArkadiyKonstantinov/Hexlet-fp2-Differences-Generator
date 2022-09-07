# Generator of difference
### Status:
[![Actions Status](https://github.com/ArkadiyKonstantinov/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ArkadiyKonstantinov/frontend-project-lvl2/actions)
[![CI](https://github.com/ArkadiyKonstantinov/frontend-project-lvl2/actions/workflows/ci.yml/badge.svg)](https://github.com/ArkadiyKonstantinov/frontend-project-lvl2/actions/workflows/ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/9632acbe5a72977fe3ff/maintainability)](https://codeclimate.com/github/ArkadiyKonstantinov/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9632acbe5a72977fe3ff/test_coverage)](https://codeclimate.com/github/ArkadiyKonstantinov/frontend-project-lvl2/test_coverage)

## Description
Compares two configuration files and shows a difference. Supporting formats: JSON, YML, YAML

[![asciicast](https://asciinema.org/a/xpr796qXvC8FYTPTp6H8A2dcF.svg)](https://asciinema.org/a/xpr796qXvC8FYTPTp6H8A2dcF)

## Installation
- Make sure you have installed Node.js no lower version 12: `node -v`
- Clone repository: `git clone git@github.com:ArkadiyKonstantinov/frontend-project-lvl2.git`
- Change directory to frontend-project-lvl2
- Run the command: `make install`


## How to use
`gendiff [options] <filepath1> <filepath2>`
You can see difference in three ways: stylish (default), plain and json.

```
gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
  ```
  