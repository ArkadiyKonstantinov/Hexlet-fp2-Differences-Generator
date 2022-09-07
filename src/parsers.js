import yaml from 'js-yaml';

export default (data, extName) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load,
  };
  return parsers[extName](data);
};
