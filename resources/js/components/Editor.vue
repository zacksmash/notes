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
      currentBodyLength: 0
    }
  },

  computed: {...mapState(['note'])},

  methods: {
    saveNote() {
      this.clearBlurSave();

      this.currentBodyLength = this.note.body ? this.note.body.length : 0;

      this.$http.put(`/notes/${this.note.id}`, this.note);
    },

    favoriteNote() {
      this.clearBlurSave();

      this.$set(this.note, 'favorited', this.note.favorited == null ? true : null);

      this.saveNote();
    },

    deleteNote(note) {
      this.clearBlurSave();

      this.$http.delete(`/notes/${note.id}`)
      .then(() => {
        this.$store.commit('applyDeleteNote', note);
        this.$store.commit('applyActiveNote', {});
      });
    },

    blurSaveNote() {
      this.blurSave = setTimeout(() => this.saveNote(), 750);
    },

    clearBlurSave() {
      return clearTimeout(this.blurSave);
    }
  },

  mounted() {
    this.$eventHub.$on('note-selected', () => {
      this.showMenu = false;
      this.currentBodyLength = this.note.body ? this.note.body.length : 0;
      this.$nextTick(() => this.$refs.noteField.focus());
    });

    this.$eventHub.$on('note-updated', (note) => {
      if (this.note.id === note.id) {
        let edits = this.note.body ? this.note.body.substring(this.currentBodyLength) : '';

        this.currentBodyLength = note.body ? note.body.length : 0;

        note.body = (note.body) ? note.body.concat('', edits) : edits;

        this.$store.commit('applyUpdateNote', note);
        this.$store.commit('applyActiveNote', note);
      }
    });

    this.$eventHub.$on('note-deleted', (note) => {
      if (this.note.id === note.id) {
        this.$store.commit('applyActiveNote', {});
      }
    });
  }
}
</script>
