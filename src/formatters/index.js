import stylish from './stylish.js';
import plain from './plain.js';

const formatMakeDiff = (data, formatName) => {
  if (formatName === 'plain') return plain(data);
  if (formatName === 'json') return JSON.stringify(data);
  return stylish(data);
};

export default formatMakeDiff;
