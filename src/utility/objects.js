const prop = {
  empty: '',
  added: 'added',
  removed: 'removed',
  changed: 'changed',
  unchanged: 'unchanged',
  nested: 'nested',
};
const indent = { base: ' ', size: 4, length: 2 };
const sign = { plus: '+', minus: '-' };
const combiSt = (v, v1, v2, stat) => ({
  name: v,
  oldValue: v1,
  newValue: v2,
  status: stat,
});
const nested = (key, child) => ({ name: key, children: child, status: prop.nested });
const addStatus = (key, values, message) => ({ name: key, value: values, status: message });
const root = (child) => ({ status: prop.empty, children: child });

export {
  prop,
  indent,
  sign,
  combiSt,
  nested,
  addStatus,
  root,
};
