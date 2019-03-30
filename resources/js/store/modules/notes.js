export default {
  namespaced: true,

  state: {
    items: [],
    active: {}
  },

  getters: {
    //
  },

  mutations: {
    setItems(state, notes) {
      state.items = notes;
    },

    activeItem(state, note) {
      state.active = note;
    },

    addItem(state, note) {
      state.items.unshift(note);
    },

    editItem(state, note) {
      let updated = state.items.findIndex((i => i.id == note.id));

      state.items.splice(updated, 1, note);
    },

    deleteItem(state, note) {
      let deleted = state.items.findIndex((i => i.id == note.id));

      state.items.splice(deleted, 1);
    }
  },

  actions: {
    all(store) {
      axios
      .get('/notes')
      .then(({data}) => {
        store.commit('setItems', data.notes);
      });
    },

    store(store, note) {
      axios
      .post('notes', note)
      .then(({data}) => {
        store.commit('addItem', data.note);
        store.commit('activeItem', data.note);
      });
    },

    update(store, note) {
      axios
      .put(`notes/${note.id}`, note)
      .then(({data}) => {
        store.commit('editItem', data.note);
      })
    },

    destroy(store, note) {
      axios
      .delete(`notes/${note.id}`)
      .then(() => {
        store.commit('deleteItem', note);
        store.commit('activeItem', {});
      })
    }
  }
}
