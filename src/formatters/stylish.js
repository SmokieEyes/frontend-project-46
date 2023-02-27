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

const actionBasedOnStatus = (value, depth) => {
  const setStringLines = (mark, name, val, dep) => `${curIndent(dep)}${mark} ${name.name}: ${checkObj(val, dep + 1)}`;
  if (value.status === 'added') {
    return setStringLines('+', value, value.value, depth);
  }
  if (value.status === 'removed') {
    return setStringLines('-', value, value.value, depth);
  }
  if (value.status === 'changed') {
    return [
      setStringLines('-', value, value.oldValue, depth),
      setStringLines('+', value, value.newValue, depth),
    ];
  }
  return setStringLines(indent, value, value.value, depth);
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
