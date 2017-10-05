let localStorage = {};

export default {
  setItem(key, value) {
    return Object.assign(localStorage, { [key]: value });
  },
  getItem(key) {
    return localStorage[key];
  },
  clear() {
    localStorage = {};
  },

  removeItem(key) {
    delete localStorage[key];
  }

};