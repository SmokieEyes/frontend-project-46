import _ from 'lodash';

const buildPlain = (lines) => [...lines].join('\n');
const checkType = (data) => {
  if (typeof data === 'string') return `'${data}'`;
  if (_.isObject(data)) return '[complex value]';
  return data;
};

const displayAdded = (child, path) => `Property '${path}' was added with value: ${checkType(child.value)}`;
const displayСhanged = (child, path) => `Property '${path}' was updated. From ${checkType(child.oldValue)} to ${checkType(child.newValue)}`;
const displayRemoved = (path) => `Property '${path}' was removed`;

const actionBasedOnStatus = (child, path) => {
  if (child.status === 'added') {
    return displayAdded(child, path);
  }
  if (child.status === 'changed') {
    return displayСhanged(child, path);
  }
  if (child.status === 'removed') {
    return displayRemoved(path);
  }
  return null;
};
const makePlain = (data) => {
  const getPlainFormat = (nodes, path) => {
    const lines = nodes
      .map((node) => {
        const curPath = [path, node.name].flat().join('.');
        if (node.status === 'nested') {
          return getPlainFormat(node.children, curPath);
        }
        return actionBasedOnStatus(node, curPath);
      })
      .filter((node) => node !== null);
    return buildPlain(lines);
  };
  const move = (node, path) => getPlainFormat(node.children, path);
  return move(data, []);
};

export default makePlain;
