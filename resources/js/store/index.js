// Import VueX
import Vuex from 'vuex';
import notes from './modules/notes';

// Global store configuration
export default new Vuex.Store({
  modules: {
    notes
  }
});
