import _ from 'lodash';

const plus = '+';
const minus = '-';
const indent = ' ';
const indentSize = 4;
const forBracket = 2;
const curIndent = (depth) => indent.repeat(indentSize * depth - forBracket);
const bracketIndent = (depth) => indent.repeat(indentSize * depth - indentSize);
const buildStyleTree = (lines, depth) => ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
const childProcess = (space, key, value) => `${space}  ${key}: ${value}`;
const checkObj = (data, depth) => {
  if (!_.isObject(data)) return data;
  const requiredIndent = curIndent(depth);
  const lines = _.keys(data).map((key) => {
    const checkingDeeper = checkObj(data[key], depth + 1);
    return childProcess(requiredIndent, key, checkingDeeper);
  });
  return buildStyleTree(lines, depth);
};

const setLinesPlusMinus = (mark, name, value, depth) => `${curIndent(depth)}${mark} ${name.name}: ${checkObj(value, depth + 1)}`;
const displayAdded = (value, depth) => setLinesPlusMinus(plus, value, value.value, depth);
const displayRemoved = (value, depth) => setLinesPlusMinus(minus, value, value.value, depth);
const displayСhanged = (value, depth) => [
  setLinesPlusMinus(minus, value, value.oldValue, depth),
  setLinesPlusMinus(plus, value, value.newValue, depth),
];
const displayUnchanged = (value, depth) => setLinesPlusMinus(indent, value, value.value, depth);

const actionBasedOnStatus = (value, depth) => {
  if (value.status === 'added') {
    return displayAdded(value, depth);
  }
  if (value.status === 'removed') {
    return displayRemoved(value, depth);
  }
  if (value.status === 'changed') {
    return displayСhanged(value, depth);
  }
  return displayUnchanged(value, depth);
};

const formsATree = (value, depth) => {
  if (value.status === 'root') {
    return buildStyleTree(value.children.flatMap((child) => formsATree(child, depth)), depth);
  }
  if (value.status === 'nested') {
    const checkingDeeper = value.children.flatMap((child) => formsATree(child, depth + 1));
    const requiredIndent = curIndent(depth);
    return childProcess(requiredIndent, value.name, buildStyleTree(checkingDeeper, depth + 1));
  }
  return actionBasedOnStatus(value, depth);
};
export default (data) => formsATree(data, 1);
