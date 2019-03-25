<template>
  <div>
    <div class="top-bar">
      <div class="top-bar-left">
        <ul class="dropdown menu" data-dropdown-menu>
          <li class="menu-text">Dashboard</li>
        </ul>
      </div>
      <div class="top-bar-right">
        <ul class="menu">
          <li>
            <button class="button" @click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="large-3 medium-4 small-12 columns">
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
      </div>

      <div class="large-9 medium-8 small-12 columns">

        <form
        @submit.prevent="saveNote"
        v-show="note.hasOwnProperty('id')">
          <textarea
          ref="noteField"
          v-model="note.body"
          @blur="blurSaveNote"
          rows="10"></textarea>
          <div class="row align-justify">
            <div class="column">
              <button class="button" type="submit">Save</button>
            </div>
            <div class="column shrink">
              <div class="button secondary" @click="favoriteNote">
                <span v-if="note.favorited">
                  &#9733;
                </span>
                <span v-else>
                  &#9734;
                </span>
              </div>
            </div>
            <div class="column shrink text-right" v-if="note.id">
              <div class="button alert" @click.once="deleteNote(note.id)">&#9587;</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: {},
      notes: [],
      blurSave: {}
    }
  },

  methods: {
    logout() {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/login'
      });
    },

    activeNote(note) {
      this.note = note;
    },

    addNote() {
      this.$nextTick(() => {

      });

      this.note = {
        id: 'pending'
      }

      this.notes.unshift(this.note);

      this.$http.post('notes', {
        user_id: this.$auth.user().id
      })
      .then(({data}) => {
        this.note = this.notes[0] = data.note;
        this.$refs.noteField.focus();
      });
    },

    saveNote() {
      clearTimeout(this.blurSave);

      this.$http.put(`/notes/${this.note.id}`, this.note);
    },

    favoriteNote() {
      clearTimeout(this.blurSave);

      this.note.favorited = this.note.favorited == null ? true : null;

      this.saveNote();
    },

    blurSaveNote() {
      this.blurSave = setTimeout(() => this.saveNote(), 750);
    },

    deleteNote(note) {
      clearTimeout(this.blurSave);
      let deleted = this.notes.findIndex((i => i.id == note));
      this.notes.splice(deleted, 1);
      this.note = {};
      this.$http.delete(`/notes/${note}`);
    },

    broadcast() {
      this.$echo.private(`Notes.User.${this.$auth.user().id}`)
      .listen('NoteCreated', ({note}) => {
        this.notes.unshift(note);
      })
      .listen('NoteUpdated', ({note}) => {
        let updated = this.notes.findIndex((i => i.id == note.id));
        this.$set(this.notes, updated, note);

        if (this.note.id == note.id) {
          this.note = note;
        }
      })
      .listen('NoteDeleted', ({note}) => {
        let deleted = this.notes.findIndex((i => i.id == note.id));
        this.notes.splice(deleted, 1);

        if (this.note.id == note.id) {
          this.note = {};
        }
      });
    }
  },

  created() {
    this.notes = this.$auth.user().notes || [];
  },

  mounted() {
    this.broadcast();
  }
}
</script>
