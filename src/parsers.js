import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import yaml from 'js-yaml';

const parsers = (filepath) => {
  if (extname(filepath) === '.yaml' || extname(filepath) === '.yml') {
    return yaml.load(readFileSync(filepath, 'utf-8'));
  }
  return JSON.parse(readFileSync(filepath, 'utf-8'));
};

export default parsers;
