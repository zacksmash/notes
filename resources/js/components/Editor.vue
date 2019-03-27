<template>
  <section class="editor-main" :class="{ 'show-menu': showMenu }">
    <div class="row column main-row">
      <div class="row align-justify">
        <div class="column">
          <button class="button" @click="showMenu = ! showMenu">Menu</button>
        </div>
        <div class="column shrink" v-if="note.id">
          <button class="button" type="submit" @click="saveNote">Save</button>
          <button class="button secondary" @click="favoriteNote">
            <span v-if="note.favorited">
              &#9733;
            </span>
            <span v-else>
              &#9734;
            </span>
          </button>
          <button class="button alert" @click="deleteNote(note)">&#9587;</button>
        </div>
      </div>
      <form
      @submit.prevent="saveNote"
      v-show="note.id">
        <textarea
        ref="noteField"
        v-model="note.body"
        @keyup="editedText"
        @keydown.once="getExistingBody"
        rows="10"></textarea>
      </form>

      <div
      v-if="showMenu"
      class="menu-overlay"
      @click="showMenu = false"></div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      blurSave: {},
      showMenu: false,
      edits: '',
      previousBody: '',
    }
  },

  computed: {...mapState(['note'])},

  methods: {
    saveNote() {
      clearTimeout(this.blurSave);

      this.$http.put(`/notes/${this.note.id}`, this.note);
    },

    favoriteNote() {
      clearTimeout(this.blurSave);

      this.$set(this.note, 'favorited', this.note.favorited == null ? true : null);

      this.saveNote();
    },

    deleteNote(note) {
      clearTimeout(this.blurSave);

      this.$http.delete(`/notes/${note.id}`)
      .then(() => {
        this.$store.commit('applyDeleteNote', note);
        this.$store.commit('applyActiveNote', {});
      });
    },

    // TODO: Add in the ability to merge notes
    editedText() {
      this.edits = this.note.body.replace(this.previousBody, '');
    },

    getExistingBody() {
      this.previousBody = this.note.body;
    },

    blurSaveNote() {
      this.blurSave = setTimeout(() => this.saveNote(), 750);
    },
  },

  mounted() {
    this.$eventHub.$on('note-selected', () => {
      this.showMenu = false;
      this.$nextTick(() => this.$refs.noteField.focus());
    });

    this.$eventHub.$on('note-updated', (note) => {
      if (this.note.id === note.id) {
        note.body = (note.body) ? note.body + this.edits : note.body;
        this.edits = '';
        this.previousBody = note.body;
        this.$store.commit('applyActiveNote', note);
      }
    });

    this.$eventHub.$on('note-deleted', (note) => {
      if (this.note.id === note.id) {
        this.$store.commit('applyDeleteNote', note);
      }
    });
  }
}
</script>
