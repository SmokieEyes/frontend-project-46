import _ from 'lodash';
import * as o from './objects.js';
import * as u from './utility.js';

// ----Stylish----
const buildStringTree = (lines, depth) => [`${o.bracket.opening}`, ...lines, `${u.bracketIndent(depth)}${o.bracket.closing}`].join('\n');

const checkObj = (data, depth) => {
  if (!_.isObject(data)) return data;
  const line = (k, deep, dat) => `${u.prefixIndent(deep)}${o.ind.base.repeat(2)}${k}${o.symb.colon} ${checkObj(dat[k], deep + 1)}`;
  return buildStringTree(_.keys(data).map((key) => line(key, depth, data)), depth);
};

const setStringLines = (mark, name, value, deep) => `${u.prefixIndent(deep)}${mark}${o.ind.base}${name.name}${o.symb.colon}${o.ind.base}${checkObj(value, deep + 1)}`;

const getLineForNested = (depth, val, func) => `${u.prefixIndent(depth)}${o.ind.base.repeat(2)}${val.name}${o.symb.colon}${o.ind.base}${func}`;

// ----Plain----
const checkType = (data) => {
  if (typeof data === 'string') return `'${data}'`;
  if (_.isObject(data)) return o.prop.complex;
  return data;
};

const displayAdded = (child, path) => `${o.stringMes.begin}${o.ind.base}${o.bracket.quo}${path}${o.bracket.quo}${o.ind.base}${o.stringMes.add}${o.ind.base}${checkType(child.value)}`;

const displayСhanged = (child, path) => `${o.stringMes.begin}${o.ind.base}${o.bracket.quo}${path}${o.bracket.quo}${o.ind.base}${o.stringMes.upd}${o.ind.base}${checkType(child.oldValue)}${o.ind.base}${o.stringMes.prep}${o.ind.base}${checkType(child.newValue)}`;

const displayRemoved = (path) => `${o.stringMes.begin}${o.ind.base}${o.bracket.quo}${path}${o.bracket.quo}${o.ind.base}${o.stringMes.removed}`;

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
