import _ from 'lodash';

const stylishTree = (dataTree, deepness = 1, indent = ' ', indentSize = 4, indentLen = 2) => {
  const curIndent = (depth) => indent.repeat(indentSize * depth - indentLen);
  const bracketIndent = (depth) => indent.repeat(indentSize * depth - indentSize);
  const buildStringTree = (lines, depth) => ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
  const checkObj = (data, depth) => {
    if (!_.isObject(data)) return data;
    return buildStringTree(_.keys(data).map((key) => `${curIndent(depth)}  ${key}: ${checkObj(data[key], depth + 1)}`), depth);
  };

  const makeLineByStatus = (key, depth) => {
    const setStringLines = (mark, name, value, deep) => `${curIndent(deep)}${mark} ${name.name}: ${checkObj(value, deep + 1)}`;
    if (key.status === 'added') return setStringLines('+', key, key.value, depth);
    if (key.status === 'removed') return setStringLines('-', key, key.value, depth);
    if (key.status === 'unchanged') return setStringLines(indent, key, key.value, depth);
    return [setStringLines('-', key, key.oldValue, depth), setStringLines('+', key, key.newValue, depth)];
  };

  const buildTree = (value, depth) => {
    if (value.status === ' ') {
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
