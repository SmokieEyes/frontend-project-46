import _ from 'lodash';
import * as o from './objects.js';
import * as u from './utility.js';

// ----Stylish----
const buildStringTree = (lines, depth) => [`${o.bracket.opening}`, ...lines, `${u.bracketIndent(depth)}${o.bracket.closing}`].join('\n');

const objectСheck = (data, depth) => {
  if (!_.isObject(data)) return data;
  const line = (k, deep, dat) => `${u.prefixIndent(deep)}${o.space.base.repeat(2)}${k}${o.symb.colon} ${objectСheck(dat[k], deep + 1)}`;
  return buildStringTree(_.keys(data).map((key) => line(key, depth, data)), depth);
};

const setStringLines = (mark, name, value, deep) => `${u.prefixIndent(deep)}${mark}${o.space.base}${name.name}${o.symb.colon}${o.space.base}${objectСheck(value, deep + 1)}`;

const getLineForNested = (depth, val, func) => `${u.prefixIndent(depth)}${o.space.base.repeat(2)}${val.name}${o.symb.colon}${o.space.base}${func}`;

// ----Plain----
const typeСhecking = (data) => {
  if (typeof data === 'string') return `'${data}'`;
  if (_.isObject(data)) return o.prop.complex;
  return data;
};

const displayAdded = (child, path) => `${o.stringMes.begin}${o.space.base}${o.bracket.quo}${path}${o.bracket.quo}${o.space.base}${o.stringMes.add}${o.space.base}${typeСhecking(child.value)}`;

const displayСhanged = (child, path) => `${o.stringMes.begin}${o.space.base}${o.bracket.quo}${path}${o.bracket.quo}${o.space.base}${o.stringMes.upd}${o.space.base}${typeСhecking(child.oldValue)}${o.space.base}${o.stringMes.prep}${o.space.base}${typeСhecking(child.newValue)}`;

const displayRemoved = (path) => `${o.stringMes.begin}${o.space.base}${o.bracket.quo}${path}${o.bracket.quo}${o.space.base}${o.stringMes.removed}`;

const buildPlain = (lines) => [...lines].join('\n');

export {
  setStringLines,
  getLineForNested,
  buildStringTree,
  displayAdded,
  displayСhanged,
  displayRemoved,
  buildPlain,
};
