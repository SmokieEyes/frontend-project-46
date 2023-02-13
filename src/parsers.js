import { readFileSync } from 'node:fs';

const parsers = (filepath) => {
return JSON.parse(readFileSync(filepath, 'utf-8'));
};

export { parsers };