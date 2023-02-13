import stylish from './stylish.js';
import plain from './plain.js';

const formatMakeDiff = (data, formatName) => {
  if (formatName === 'plain') return plain(data);
  return stylish(data);
};

export default formatMakeDiff;
