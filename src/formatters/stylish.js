import _ from 'lodash';

const getIndent = (position, level) => {
  const replacer = ' ';
  const spacesCount = 4;
  const prefixSize = spacesCount * level - 2;
  const indent = {
    current: `${replacer.repeat(prefixSize)}`,
    bracket: `${replacer.repeat(prefixSize - 2)}`,
  };
  return indent[position];
};

const stringify = (currentValue, level = 1) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const keys = Object.keys(currentValue);
  const strings = keys
    .map((key) => `${getIndent('current', level)}  ${key}: ${stringify(currentValue[key], level + 1)}`);
  return ['{', ...strings, `${getIndent('bracket', level)}}`].join('\n');
};

const stringTypes = {
  nested: (diff, level, iter) => `${getIndent('current', level)}  ${diff.key}: ${iter(diff.children, level + 1)}`,
  added: (diff, level) => `${getIndent('current', level)}+ ${diff.key}: ${stringify(diff.value, level + 1)}`,
  removed: (diff, level) => `${getIndent('current', level)}- ${diff.key}: ${stringify(diff.value, level + 1)}`,
  updated: (diff, level) => [`${getIndent('current', level)}- ${diff.key}: ${stringify(diff.old, level + 1)}`,
    `${getIndent('current', level)}+ ${diff.key}: ${stringify(diff.updated, level + 1)}`],
  unchanged: (diff, level) => `${getIndent('current', level)}  ${diff.key}: ${stringify(diff.value, level + 1)}`,
};

const formatStylish = (differences) => {
  const iter = (currentDifferences, level = 1) => {
    const lines = currentDifferences
      .flatMap((diff) => (diff.type === 'nested'
        ? stringTypes[diff.type](diff, level, iter)
        : stringTypes[diff.type](diff, level)));
    return ['{', ...lines, `${getIndent('bracket', level)}}`].join('\n');
  };
  return iter(differences, 1);
};

export default formatStylish;
