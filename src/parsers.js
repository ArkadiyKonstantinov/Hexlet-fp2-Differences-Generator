import yaml from 'js-yaml';

export default ({ data, extName }) => {
  let parse;
  if (extName === '.json') {
    parse = JSON.parse;
  } else if (extName === '.yml' || extName === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};
