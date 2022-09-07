import _ from 'lodash';

const getIndent = (position, level) => {
  const replacer = ' ';
  const spacesCount = 2;
  const prefixSize = spacesCount * level;
  const indent = {
    current: `${replacer.repeat(prefixSize)}`,
    bracket: `${replacer.repeat(prefixSize - spacesCount)}`,
  };
  return indent[position];
};

const stringify = (currentValue, level = 1) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const keys = Object.keys(currentValue);
  const strings = keys
    .map((key) => `${getIndent('current', level)}${key}: ${stringify(currentValue[key], level + 1)}`);
  return ['{', ...strings, `${getIndent('bracket', level)}}`].join('\n');
};

const stylish = (differences) => {
  const iter = (currentDiff, level = 1) => {
    const keys = Object.keys(currentDiff).sort();
    const lines = keys
      .flatMap((key) => {
        const { type, value } = currentDiff[key];
        switch (type) {
          case 'nested': {
            return [`${getIndent('current', level)}  ${key}: ${iter(value, level + 1)}`];
          }
          case 'added': {
            return [`${getIndent('current', level)}+ ${key}: ${stringify(value, level + 1)}`];
          }
          case 'removed': {
            return [`${getIndent('current', level)}- ${key}: ${stringify(value, level + 1)}`];
          }
          case 'updated': {
            const { old, updated } = value;
            return [`${getIndent('current', level)}- ${key}: ${stringify(old, level + 1)}`,
              `${getIndent('current', level)}+ ${key}: ${stringify(updated, level + 1)}`];
          }
          default: { // case 'equal'
            return [`${getIndent('current', level)}  ${key}: ${stringify(value, level + 1)}`];
          }
        }
      });
    return ['{', ...lines, `${getIndent('bracket', level)}}`].join('\n');
  };
  return iter(differences, 1);
};

export default stylish;
