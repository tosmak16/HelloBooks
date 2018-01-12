
export const localStorage = {
  setItem(key, value) {
    return Object.assign(window.localStorage, { [key]: value });
  },
  getItem(key) {
    return window.localStorage[key];
  },
  clear() {
    window.localStorage = {};
  },

  removeItem(key) {
    return delete window.localStorage[key];
  }

};
export default localStorage;
