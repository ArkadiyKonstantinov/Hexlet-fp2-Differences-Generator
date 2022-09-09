import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const stringTypes = {
  nested: (diff, currentPath, iter) => iter(diff.children, currentPath),
  added: (diff, currentPath) => `Property '${currentPath.join('.')}' was ${diff.type} with value: ${stringify(diff.value)}`,
  removed: (diff, currentPath) => `Property '${currentPath.join('.')}' was ${diff.type}`,
  updated: (diff, currentPath) => `Property '${currentPath.join('.')}' was ${diff.type}. From ${stringify(diff.old)} to ${stringify(diff.updated)}`,
  equal: () => [],
};

const plain = (differences) => {
  const iter = (currentDifferences, path = []) => {
    const lines = currentDifferences
      .flatMap((diff) => {
        const currentPath = [...path, diff.key];
        return diff.type === 'nested'
          ? stringTypes[diff.type](diff, currentPath, iter)
          : stringTypes[diff.type](diff, currentPath);
      });
    return lines.join('\n');
  };
  return iter(differences);
};

export default plain;
