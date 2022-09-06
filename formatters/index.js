import stylish from './stylish.js';
import plane from './plane.js';

export default (diff, formatName) => {
  let format;
  if (formatName === 'stylish') {
    format = stylish;
  } else if (formatName === 'plane') {
    format = plane;
  }
  return format(diff);
};
