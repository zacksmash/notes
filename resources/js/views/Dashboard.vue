<template>
  <div class="editor-container">
    <side-menu/>

    <editor/>
  </div>
</template>

<script>
import SideMenu from '../components/Menu';
import Editor from '../components/Editor';

export default {
  data() {
    return {
      note: {},
      notes: [],
      blurSave: {}
    }
  },

  components: {
    Editor,
    SideMenu
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
      this.$emit('note-selected');
    },

    addNote() {
      this.note = {
        id: 'pending'
      }

      this.notes.unshift(this.note);

      this.$http.post('notes', {
        user_id: this.$auth.user().id
      })
      .then(({data}) => {
        this.note = this.notes[0] = data.note;
        this.$emit('note-selected');
      });
    },

    removeNote(note) {
      let deleted = this.notes.findIndex((i => i.id == note));
      this.notes.splice(deleted, 1);
      this.note = {};
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
    Dispatch.listen('note-deleted', (note) => this.removeNote(note));
  }
}
</script>
