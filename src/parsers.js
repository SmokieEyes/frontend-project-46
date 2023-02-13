import { readFileSync } from 'node:fs';

const parsers = (filepath) => JSON.parse(readFileSync(filepath, 'utf-8'));

export default parsers;
