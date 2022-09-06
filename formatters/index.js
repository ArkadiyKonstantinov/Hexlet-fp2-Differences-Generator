import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, formatName) => {
  let format;
  if (formatName === 'stylish') {
    format = stylish;
  } else if (formatName === 'plain') {
    format = plain;
  }
  return format(diff);
};
