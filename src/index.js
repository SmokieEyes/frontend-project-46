import _ from 'lodash';
import parsers from './parsers.js';
import formatMakeDiff from './formatters/index.js';
import * as o from './utility/objects.js';
import * as u from './utility/utility.js';

const getDiffTree = (file1, file2) => {
  const getDifference = (data1, data2) => {
    const inserted = u.getSortUnionKeys(data1, data2).map((key) => {
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return o.nested(key, getDifference(data1[key], data2[key]));
      }
      return u.setStatusOfKey(data1, data2, key);
    });
    return inserted;
  };
  return o.root(getDifference(file1, file2));
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parsers(u.getFilePath(filepath1));
  const file2 = parsers(u.getFilePath(filepath2));
  return formatMakeDiff(getDiffTree(file1, file2), formatName);
};
export default gendiff;
