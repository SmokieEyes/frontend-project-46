import * as u from '../utility/utility.js';
import * as o from '../utility/objects.js';

const makeLineByStatus = (key, depth) => {
  const setStringLines = (mark, name, value, deep) => `${u.curIndent(deep)}${mark} ${name.name}: ${u.checkObj(value, deep + 1)}`;
  if (key.status === o.prop.added) return setStringLines(o.sign.plus, key, key.value, depth);
  if (key.status === o.prop.removed) return setStringLines(o.sign.minus, key, key.value, depth);
  if (key.status === o.prop.unchanged) return setStringLines(o.indent.base, key, key.value, depth);
  return [
    setStringLines(o.sign.minus, key, key.oldValue, depth),
    setStringLines(o.sign.plus, key, key.newValue, depth),
  ];
};
const stylishTree = (dataTree, deepness = 1) => {
  const buildTree = (value, depth) => {
    if (value.status === o.prop.empty) {
      return u.buildStringTree(value.children.flatMap((child) => buildTree(child, depth)), depth);
    }
    if (value.status === o.prop.nested) {
      const checkingDeeper = value.children.flatMap((child) => buildTree(child, depth + 1));
      return `${u.curIndent(depth)}  ${value.name}: ${u.buildStringTree(checkingDeeper, depth + 1)}`;
    }
    return makeLineByStatus(value, depth);
  };
  return buildTree(dataTree, deepness);
};
export default stylishTree;
