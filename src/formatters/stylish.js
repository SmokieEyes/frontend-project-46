import * as o from '../utility/objects.js';
import * as l from '../utility/lines.js';

const makeLineByStatus = (key, depth) => {
  if (key.status === o.prop.added) return l.setStringLines(o.symb.plus, key, key.value, depth);
  if (key.status === o.prop.removed) return l.setStringLines(o.symb.minus, key, key.value, depth);
  if (key.status === o.prop.unchanged) return l.setStringLines(o.space.base, key, key.value, depth);
  return [
    l.setStringLines(o.symb.minus, key, key.oldValue, depth),
    l.setStringLines(o.symb.plus, key, key.newValue, depth),
  ];
};
const stylishTree = (dataTree, deepness = 1) => {
  const buildTree = (value, depth) => {
    if (value.status === o.prop.empty) {
      return l.buildStringTree(value.children.flatMap((child) => buildTree(child, depth)), depth);
    }
    if (value.status === o.prop.nested) {
      const checkingDeeper = value.children.flatMap((child) => buildTree(child, depth + 1));
      return l.getLineForNested(depth, value, l.buildStringTree(checkingDeeper, depth + 1));
    }
    return makeLineByStatus(value, depth);
  };
  return buildTree(dataTree, deepness);
};
export default stylishTree;
