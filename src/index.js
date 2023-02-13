import { cwd } from 'node:process';
import { resolve } from 'node:path';
import _ from 'lodash';
import parsers from './parsers.js';
import formatMakeDiff from './formatters/stylish.js';

const getFilePath = (filepath) => resolve(cwd(), filepath);
const getSortUnionKeys = (file1, file2) => _.sortBy(_.union(_.keys(file1), _.keys(file2)));
const isObject = (key1, key2) => _.isPlainObject(key1) && _.isPlainObject(key2);
const messenger = (key, values, message) => ({ name: key, value: values, status: `${message}` });

const setStatusOfKey = (data1, data2, key) => {
  if (!_.has(data1, key)) {
    return messenger(key, data2[key], 'added');
  }
  if (!_.has(data2, key)) {
    return messenger(key, data1[key], 'removed');
  }
  if (!_.isEqual(data1[key], data2[key])) {
    return {
      name: key,
      oldValue: data1[key],
      newValue: data2[key],
      status: 'changed',
    };
  }
  return messenger(key, data1[key], 'unchanged');
};
const getDiffTree = (file1, file2) => {
  const getDifference = (data1, data2) => {
    const inserted = getSortUnionKeys(data1, data2).map((key) => {
      if (isObject(data1[key], data2[key])) {
        return { name: key, children: getDifference(data1[key], data2[key]), status: 'nested' };
      }
      return setStatusOfKey(data1, data2, key);
    });
    return inserted;
  };
  return ({ status: 'root', children: getDifference(file1, file2) });
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parsers(getFilePath(filepath1));
  const file2 = parsers(getFilePath(filepath2));
  return formatMakeDiff(getDiffTree(file1, file2), formatName);
};
export default gendiff;
