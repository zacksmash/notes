<template>
  <section class="editor-main" :class="{ 'show-menu': showMenu }">
    <div class="row align-justify">
      <div class="column">
        <button class="button" @click="showMenu = ! showMenu">Menu</button>
      </div>
      <div class="column shrink" v-if="note.id">
        <button class="button" type="submit">Save</button>
        <button class="button secondary" @click="favoriteNote">
          <span v-if="note.favorited">
            &#9733;
          </span>
          <span v-else>
            &#9734;
          </span>
        </button>
        <button class="button alert" @click="deleteNote(note.id)">&#9587;</button>
      </div>
    </div>
    <form
    @submit.prevent="saveNote"
    v-show="note.hasOwnProperty('id')">
      <textarea
      ref="noteField"
      v-model="note.body"
      @blur="blurSaveNote"
      rows="10"></textarea>
    </form>

    <div
    v-if="showMenu"
    class="menu-overlay"
    @click="showMenu = false"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      note: {},
      blurSave: {},
      showMenu: false
    }
  },

  methods: {
    saveNote() {
      clearTimeout(this.blurSave);

      this.$http.put(`/notes/${this.note.id}`, this.note);
    },

    favoriteNote() {
      clearTimeout(this.blurSave);

      this.note.favorited = this.note.favorited == null ? true : null;

      this.saveNote();
    },

    deleteNote(note) {
      clearTimeout(this.blurSave);

      Dispatch.fire('note-deleted', note);

      this.note = {};

      this.$http.delete(`/notes/${note}`);
    },

    blurSaveNote() {
      this.blurSave = setTimeout(() => this.saveNote(), 750);
    },
  },

  mounted() {
    Dispatch.listen('note-selected', (note) => {
      this.note = note;
      this.showMenu = false;
      this.$refs.noteField.focus();
    });
  }
}
</script>
