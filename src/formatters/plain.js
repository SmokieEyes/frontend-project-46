import * as o from '../utility/objects.js';
import * as l from '../utility/lines.js';

const makeLineByStatus = (child, path) => {
  if (child.status === o.prop.added) {
    return l.displayAdded(child, path);
  }
  if (child.status === o.prop.changed) {
    return l.displayСhanged(child, path);
  }
  if (child.status === o.prop.removed) {
    return l.displayRemoved(path);
  }
  return null;
};

const makePlain = (data) => {
  const getPlainFormat = (nodes, path) => {
    const lines = nodes
      .map((node) => {
        const currentPath = [path, node.name].flat().join('.');
        if (node.status === o.prop.nested) {
          return getPlainFormat(node.children, currentPath);
        }
        return makeLineByStatus(node, currentPath);
      })
      .filter((node) => node !== null);
    return l.buildPlain(lines);
  };
  const move = (node, path) => getPlainFormat(node.children, path);
  return move(data, []);
};

export default makePlain;
