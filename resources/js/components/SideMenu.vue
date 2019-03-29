<template>
  <aside class="editor-menu">
    <button
    @click="addNote"
    class="button expanded">
      Add Note
    </button>
    <ul class="menu vertical">
      <li
      v-for="note in notes"
      :key="note.id"
      v-text="note.body ? note.body : 'New Note'"
      @click="activeNote(note)">
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {}
  },

  computed: {...mapState(['notes', 'note'])},

  methods: {
    addNote(store) {
      this.$http.post('notes', {
        user_id: this.$auth.user().id
      })
      .then(({data}) => {
        this.$store.commit('applyAddNote', data.note);
        this.activeNote(data.note)
      });
    },

    activeNote(note) {
      this.$store.commit('applyActiveNote', note);
      this.$eventHub.$emit('note-selected', note);
    },

    logout() {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/login'
      });
    },
  },
}
</script>
