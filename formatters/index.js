import stylish from './stylish.js';
import plane from './plane.js';

export default (diff, format) => {
  let formater;
  if (format === 'stylish') {
    formater = stylish;
  } else if (format === 'plane') {
    formater = plane;
  }
  return formater(diff);
};
