import * as u from '../utility/utility.js';
import * as o from '../utility/objects.js';

const makeLineByStatus = (child, path) => {
  if (child.status === o.prop.added) {
    return u.displayAdded(child, path);
  }
  if (child.status === o.prop.changed) {
    return u.displayСhanged(child, path);
  }
  if (child.status === o.prop.removed) {
    return u.displayRemoved(path);
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
    return u.buildPlain(lines);
  };
  const move = (node, path) => getPlainFormat(node.children, path);
  return move(data, []);
};

export default makePlain;
