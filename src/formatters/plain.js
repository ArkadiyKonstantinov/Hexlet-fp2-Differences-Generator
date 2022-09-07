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

const plain = (differences) => {
  const iter = (currentDifferences, path = []) => {
    const lines = currentDifferences
      .flatMap((diff) => {
        const currentPath = [...path, diff.key];
        switch (diff.type) {
          case 'nested': {
            return iter(diff.children, currentPath);
          }
          case 'added': {
            return `Property '${currentPath.join('.')}' was ${diff.type} with value: ${stringify(diff.value)}`;
          }
          case 'removed': {
            return `Property '${currentPath.join('.')}' was ${diff.type}`;
          }
          case 'updated': {
            return `Property '${currentPath.join('.')}' was ${diff.type}. From ${stringify(diff.old)} to ${stringify(diff.updated)}`;
          }
          default: {
            return [];
          }
        }
      });
    return lines.join('\n');
  };
  return iter(differences);
};

export default plain;
