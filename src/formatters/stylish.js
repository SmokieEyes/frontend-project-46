import _ from 'lodash';

const stylishTree = (dataTree, deepness = 1, indent = ' ', indentSize = 4, indentLen = 2) => {
  const currentIndent = (depth) => indent.repeat(indentSize * depth - indentLen);
  const bracketIndent = (depth) => indent.repeat(indentSize * depth - indentSize);
  const buildStyleTree = (lines, depth) => ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
  const checkObj = (data, depth) => {
    if (!_.isObject(data)) return data;
    const lines = _.keys(data).map((key) => `${currentIndent(depth)}  ${key}: ${checkObj(data[key], depth + 1)}`);
    return buildStyleTree(lines, depth);
  };

  const actionBasedOnStatus = (key, depth) => {
    const setStringLines = (mark, name, val, dep) => `${currentIndent(dep)}${mark} ${name.name}: ${checkObj(val, dep + 1)}`;
    if (key.status === 'added') {
      return setStringLines('+', key, key.value, depth);
    }
    if (key.status === 'removed') {
      return setStringLines('-', key, key.value, depth);
    }
    if (key.status === 'changed') {
      return [
        setStringLines('-', key, key.oldValue, depth),
        setStringLines('+', key, key.newValue, depth),
      ];
    }
    return setStringLines(indent, key, key.value, depth);
  };

  const buildTree = (value, depth) => {
    if (value.status === 'root') {
      return buildStyleTree(value.children.flatMap((child) => buildTree(child, depth)), depth);
    }
    if (value.status === 'nested') {
      const checkingDeeper = value.children.flatMap((child) => buildTree(child, depth + 1));
      return `${currentIndent(depth)}  ${value.name}: ${buildStyleTree(checkingDeeper, depth + 1)}`;
    }
    return actionBasedOnStatus(value, depth);
  };
  return buildTree(dataTree, deepness);
};
export default stylishTree;
