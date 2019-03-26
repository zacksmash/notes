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
export default {
  data() {
    return {
      notes: this.$auth.user().notes,
      note: {}
    }
  },

  methods: {
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
        Dispatch.fire('note-selected', this.note);
      });
    },

    activeNote(note) {
      Dispatch.fire('note-selected', note);
    }
  },

  mounted() {
    Dispatch.listen('note-deleted', (note) => {
      let deleted = this.notes.findIndex((i => i.id == note));
      this.notes.splice(deleted, 1);
      this.note = {};
    })
  }
}
</script>
