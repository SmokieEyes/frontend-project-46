import { cwd } from 'node:process';
import { resolve } from 'node:path';
import _ from 'lodash';
import * as o from './objects.js';

// ---- Index ----
const getFilePath = (filepath) => resolve(cwd(), filepath);

const getSortUnionKeys = (file1, file2) => _.sortBy(_.union(_.keys(file1), _.keys(file2)));

const setStatusOfKey = (data1, data2, key) => {
  if (!_.has(data1, key)) return o.addStatus(key, data2[key], o.prop.added);
  if (!_.has(data2, key)) return o.addStatus(key, data1[key], o.prop.removed);
  if (!_.isEqual(data1[key], data2[key])) {
    return o.combiSt(key, data1[key], data2[key], o.prop.changed);
  }
  return o.addStatus(key, data1[key], o.prop.unchanged);
};

// ----Stylish----
const prefixIndent = (depth) => o.ind.base.repeat(o.ind.size * depth - o.ind.toTheLeft);

const bracketIndent = (depth) => o.ind.base.repeat(o.ind.size * depth - o.ind.size);

export {
  prefixIndent,
  getFilePath,
  getSortUnionKeys,
  bracketIndent,
  setStatusOfKey,
};
