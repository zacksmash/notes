<template>
  <div class="editor-container">
    <side-menu :notes="notes" />
    <editor :note="note" />
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu';
import Editor from '../components/Editor';
import { mapState } from 'vuex';

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState({
      note: state => state.notes.active,
      notes: state => state.notes.items
    })
  },

  components: {
    Editor,
    SideMenu
  },

  methods: {
    broadcast() {
      this.$echo.private(`Notes.User.${this.$auth.user().id}`)
      .listen('NoteCreated', ({note}) => {
        this.$store.commit('notes/addItem', note);

        this.$eventHub.$emit('note-added', note);
      })
      .listen('NoteUpdated', ({note}) => {
        this.$store.commit('notes/editItem', note);

        this.$eventHub.$emit('note-updated', note);
      })
      .listen('NoteDeleted', ({note}) => {
        this.$store.commit('notes/deleteItem', note);

        this.$eventHub.$emit('note-deleted', note);
      });
    }
  },

  created() {
    this.$store.dispatch('notes/all');

    this.broadcast();
  }
}
</script>
