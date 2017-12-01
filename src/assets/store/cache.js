import store from './index.js';
const storageKey = "localData";

function deepClone(obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  } else if (obj && typeof obj === 'object') {
    var cloned = {};
    var keys = Object.keys(obj);
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      cloned[key] = deepClone(obj[key]);
    }
    return cloned;
  } else {
    return obj;
  }
}

export default {
  save() {
      alert('done');
      const states = store.state;
      const list = deepClone(states);
      localStorage.setItem(storageKey, JSON.stringify(list));
    },
    get() {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    },
    clear() {
      localStorage.removeItem(storageKey);
    }
};