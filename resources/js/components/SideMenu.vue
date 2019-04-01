<template>
  <aside class="editor-menu">
    <button
    @click="createNote"
    class="button expanded">
      Add Note
    </button>
    <ul class="menu vertical">
      <li
      v-for="note in notes"
      :key="note.id"
      @click="selectNote(note)">
        {{ note.body ? note.body : 'New Note' | escapeHtml }}
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      newNote: {
        user_id: this.$auth.user().id
      }
    }
  },

  props: ['notes'],

  methods: {
    createNote() {
      this.$store
      .dispatch('notes/store', this.newNote)
      .then(() => this.$eventHub.$emit('note-selected', this.note));
    },

    selectNote(note) {
      this.$store.commit('notes/activeItem', note);

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
