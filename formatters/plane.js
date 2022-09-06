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

const plane = (differences, keyPath = []) => {
  const keys = Object.keys(differences).sort();
  const lines = keys
    .flatMap((key) => {
      const currentKeyPath = [...keyPath, key];
      const { type, value } = differences[key];
      let result;
      switch (type) {
        case 'nested': {
          result = plane(value, currentKeyPath);
          break;
        }
        case 'added': {
          const currentValue = getCurrentValue(value);
          result = `Property '${currentKeyPath.join('.')}' was ${type} with value: ${currentValue}`;
          break;
        }
        case 'removed': {
          result = `Property '${currentKeyPath.join('.')}' was ${type}`;
          break;
        }
        case 'updated': {
          const { old, updated } = value;
          const currentOld = getCurrentValue(old);
          const currentUpdated = getCurrentValue(updated);
          result = `Property '${currentKeyPath.join('.')}' was ${type}. From ${currentOld} to ${currentUpdated}`;
          break;
        }
        default: {
          result = [];
          break;
        }
      }
      return result;
    });
  return lines.join('\n');
};

export default plane;
