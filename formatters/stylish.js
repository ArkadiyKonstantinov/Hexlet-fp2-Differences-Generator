import _ from 'lodash';

const replacer = ' ';
const spacesCount = 2;

const stringify = (currentValue, level = 1) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const prefixSize = spacesCount * level;
  const start = '{';
  const currentIndent = `${replacer.repeat(prefixSize)}`;
  const end = `${replacer.repeat(prefixSize - spacesCount)}}`;
  const keys = Object.keys(currentValue);
  const strings = keys
    .map((key) => `${currentIndent}${key}: ${stringify(currentValue[key], level + 1)}`);
  return [start, ...strings, end].join('\n');
};

const stylish = (differences) => {
  const iter = (currentDiff, level = 1) => {
    const keys = Object.keys(currentDiff).sort();
    const prefixSize = spacesCount * level;
    const start = '{';
    const currentIndent = `${replacer.repeat(prefixSize)}`;
    const end = `${replacer.repeat(prefixSize - spacesCount)}}`;
    const lines = keys
      .flatMap((key) => {
        const { type, value } = currentDiff[key];
        let result = [];
        switch (type) {
          case 'nested': {
            const prefix = '  ';
            result = [`${currentIndent}${prefix}${key}: ${iter(value, level + 1)}`];
            break;
          }
          case 'added': {
            const prefix = '+ ';
            result = [`${currentIndent}${prefix}${key}: ${stringify(value, level + 1)}`];
            break;
          }
          case 'removed': {
            const prefix = '- ';
            result = [`${currentIndent}${prefix}${key}: ${stringify(value, level + 1)}`];
            break;
          }
          case 'updated': {
            const { old, updated } = value;
            const prefixOld = '- ';
            const prifixUpdatet = '+ ';
            result = [`${currentIndent}${prefixOld}${key}: ${stringify(old, level + 1)}`,
              `${currentIndent}${prifixUpdatet}${key}: ${stringify(updated, level + 1)}`];
            break;
          }
          case 'equal': {
            const prefix = '  ';
            result = [`${currentIndent}${prefix}${key}: ${stringify(value, level + 1)}`];
            break;
          }
        }
        return result;
      });
    return [start, ...lines, end].join('\n');
  };
  return iter(differences, 1);
};

export default stylish;
