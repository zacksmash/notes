<template>
  <div class="editor-container">
    <side-menu/>
    <editor/>
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
    ...mapState(['note'])
  },

  components: {
    Editor,
    SideMenu
  },

  methods: {
    broadcast() {
      this.$echo.private(`Notes.User.${this.$auth.user().id}`)
      .listen('NoteCreated', ({note}) => {
        this.$store.commit('applyAddNote', note);
        this.$eventHub.$emit('note-added', note);
      })
      .listen('NoteUpdated', ({note}) => {
        this.$eventHub.$emit('note-updated', note);
        this.$store.commit('applyUpdateNote', note);
      })
      .listen('NoteDeleted', ({note}) => {
        this.$store.commit('applyDeleteNote', note);
        this.$eventHub.$emit('note-deleted', note);
      });
    }
  },

  created() {
    this.$store.dispatch('getNotes');
  },

  mounted() {
    this.broadcast();
  }
}
</script>
