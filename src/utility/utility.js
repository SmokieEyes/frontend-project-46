import { cwd } from 'node:process';
import { resolve } from 'node:path';
import _ from 'lodash';
import * as o from './objects.js';

const getFilePath = (filepath) => resolve(cwd(), filepath);

const getSortUnionKeys = (file1, file2) => _.sortBy(_.union(_.keys(file1), _.keys(file2)));

const curIndent = (depth) => o.indent.base.repeat(o.indent.size * depth - o.indent.length);

const bracketIndent = (depth) => o.indent.base.repeat(o.indent.size * depth - o.indent.size);

const buildStringTree = (lines, depth) => ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');

const checkObj = (data, depth) => {
  if (!_.isObject(data)) return data;
  return buildStringTree(_.keys(data).map((key) => `${curIndent(depth)}  ${key}: ${checkObj(data[key], depth + 1)}`), depth);
};

const setStatusOfKey = (data1, data2, key) => {
  if (!_.has(data1, key)) return o.addStatus(key, data2[key], o.prop.added);
  if (!_.has(data2, key)) return o.addStatus(key, data1[key], o.prop.removed);
  if (!_.isEqual(data1[key], data2[key])) {
    return o.combiSt(key, data1[key], data2[key], o.prop.changed);
  }
  return o.addStatus(key, data1[key], o.prop.unchanged);
};

const buildPlain = (lines) => [...lines].join('\n');

const checkType = (data) => {
  if (typeof data === 'string') return `'${data}'`;
  if (_.isObject(data)) return '[complex value]';
  return data;
};

const displayAdded = (child, path) => `Property '${path}' was added with value: ${checkType(child.value)}`;
const displayСhanged = (child, path) => `Property '${path}' was updated. From ${checkType(child.oldValue)} to ${checkType(child.newValue)}`;
const displayRemoved = (path) => `Property '${path}' was removed`;

export {
  curIndent,
  getFilePath,
  getSortUnionKeys,
  bracketIndent,
  checkObj,
  buildStringTree,
  setStatusOfKey,
  displayAdded,
  displayСhanged,
  displayRemoved,
  buildPlain,
};
