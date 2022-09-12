import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import json from './json.js';

export default (differences, formatName) => {
  const formatters = {
    stylish: formatStylish,
    plain: formatPlain,
    json,
  };

  return formatters[formatName](differences);
};
