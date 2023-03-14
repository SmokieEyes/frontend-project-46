import _ from 'lodash';

const indent = { base: ' ', size: 4, length: 2 };
const sign = { plus: '+', minus: '-' };
const curIndent = (depth) => indent.base.repeat(indent.size * depth - indent.length);
const bracketIndent = (depth) => indent.base.repeat(indent.size * depth - indent.size);
const buildStringTree = (lines, depth) => ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
const checkObj = (data, depth) => {
  if (!_.isObject(data)) return data;
  return buildStringTree(_.keys(data).map((key) => `${curIndent(depth)}  ${key}: ${checkObj(data[key], depth + 1)}`), depth);
};
const stylishTree = (dataTree, deepness = 1) => {
  const makeLineByStatus = (key, depth) => {
    const setStringLines = (mark, name, value, deep) => `${curIndent(deep)}${mark} ${name.name}: ${checkObj(value, deep + 1)}`;
    if (key.status === 'added') return setStringLines(sign.plus, key, key.value, depth);
    if (key.status === 'removed') return setStringLines(sign.minus, key, key.value, depth);
    if (key.status === 'unchanged') return setStringLines(indent.base, key, key.value, depth);
    return [
      setStringLines(sign.minus, key, key.oldValue, depth),
      setStringLines(sign.plus, key, key.newValue, depth),
    ];
  };

  const buildTree = (value, depth) => {
    if (value.status === '') {
      return buildStringTree(value.children.flatMap((child) => buildTree(child, depth)), depth);
    }
    if (value.status === 'nested') {
      const checkingDeeper = value.children.flatMap((child) => buildTree(child, depth + 1));
      return `${curIndent(depth)}  ${value.name}: ${buildStringTree(checkingDeeper, depth + 1)}`;
    }
    return makeLineByStatus(value, depth);
  };
  return buildTree(dataTree, deepness);
};
export default stylishTree;
