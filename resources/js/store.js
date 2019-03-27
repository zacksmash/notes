// Import VueX
import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';

// Global store configuration
export default new Vuex.Store({
  state: {
    notes: [],
    note: {}
  },

  getters: {
    //
  },

  mutations: {
    applyGetNotes(state, data) {
      state.notes = data;
    },

    applyActiveNote(state, data) {
      state.note = data;
    },

    applyAddNote(state, data) {
      state.notes.unshift(data);
      state.note = data;
    },

    applyUpdateNote(state, data) {
      let updated = state.notes.findIndex((i => i.id == data.id));
      state.notes.splice(updated, 1, data);
    },

    applyDeleteNote(state, data) {
      let deleted = state.notes.findIndex((i => i.id == data));
      state.notes.splice(deleted, 1);
    }
  },

  actions: {
    getNotes(store) {
      axios.get('/notes')
      .then(({data}) => {
        store.commit('applyGetNotes', data.notes);
      });
    }
  }
});
