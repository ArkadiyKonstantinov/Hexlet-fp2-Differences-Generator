import _ from 'lodash';

const getCurrentValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (differences, keyPath = []) => {
  const lines = differences
    .flatMap((diff) => {
      const currentKeyPath = [...keyPath, diff.key];
      switch (diff.type) {
        case 'nested': {
          return plain(diff.children, currentKeyPath);
        }
        case 'added': {
          return `Property '${currentKeyPath.join('.')}' was ${diff.type} with value: ${getCurrentValue(diff.value)}`;
        }
        case 'removed': {
          return `Property '${currentKeyPath.join('.')}' was ${diff.type}`;
        }
        case 'updated': {
          return `Property '${currentKeyPath.join('.')}' was ${diff.type}. From ${getCurrentValue(diff.old)} to ${getCurrentValue(diff.updated)}`;
        }
        default: {
          return [];
        }
      }
    });
  return lines.join('\n');
};

export default plain;
