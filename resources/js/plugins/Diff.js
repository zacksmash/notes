export default {
  install: (Vue) => {
    Vue.prototype.$diff = require('diff/dist/diff.js');
  }
}
