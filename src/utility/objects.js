const prop = {
  empty: '',
  added: 'added',
  removed: 'removed',
  changed: 'changed',
  unchanged: 'unchanged',
  nested: 'nested',
  complex: '[complex value]',
};

const ind = { base: ' ', size: 4, toTheLeft: 2 };
const symb = { plus: '+', minus: '-', colon: ':' };
const bracket = { opening: '{', closing: '}', quo: "'" };

const stringMes = {
  begin: 'Property',
  add: 'was added with value:',
  upd: 'was updated. From',
  removed: 'was removed',
  prep: 'to',
};

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
  ind,
  symb,
  bracket,
  combiSt,
  nested,
  addStatus,
  root,
  stringMes,
};
