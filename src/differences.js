import _ from 'lodash';

const genDifferences = (left, right) => {
  const keys = _.sortBy(_.union(Object.keys(left), Object.keys(right)));
  return keys
    .map((key) => {
      const leftValue = _.cloneDeep(left[key]);
      const rightValue = _.cloneDeep(right[key]);
      if (_.isObject(left[key]) && _.isObject(right[key])) {
        return { key, type: 'nested', children: genDifferences(left[key], right[key]) };
      }
      if (!Object.hasOwn(left, key)) {
        return { key, type: 'added', value: rightValue };
      }
      if (!Object.hasOwn(right, key)) {
        return { key, type: 'removed', value: leftValue };
      }
      if (!Object.is(left[key], right[key])) {
        return {
          key, type: 'updated', old: leftValue, updated: rightValue,
        };
      }
      return { key, type: 'unchanged', value: leftValue };
    });
};

export default genDifferences;
