<template>
  <section class="editor-main" :class="{ 'show-menu': showMenu }">
    <div class="row column main-row">
      <div class="row align-justify">
        <div class="column">
          <button class="button" @click="showMenu = ! showMenu">Menu</button>
        </div>
        <div class="column shrink" v-if="note.id">
          <button class="button warning" data-toggle="editor-menu">Insert</button>
          <zurb-dropdown id="editor-menu">
            <div class="button-group expanded overflow">
              <a class="button" @click="insertElement('H1')">Title</a>
              <a class="button" @click="insertElement('H4')">Heading</a>
              <a class="button" @click="insertElement('P')">Body</a>
              <a class="button" @click="insertElement('PRE')">Code</a>
            </div>
            <!-- <div class="button-group expanded">
              <a class="button" @click="applyStyle('bold')">B</a>
              <a class="button" @click="applyStyle('italic')">I</a>
              <a class="button" @click="applyStyle('underline')">U</a>
              <a class="button" @click="applyStyle('strikeThrough')">S</a>
            </div> -->
            <div class="inline-button-group">
              <div class="button-group">
                <a class="button" @click="insertList('UL')">UL</a>
                <a class="button" @click="insertList('OL')">OL</a>
              </div>
              <div class="button-group expanded">
                <a class="button" @click="applyStyle('outdent')">&larr;</a>
                <a class="button" @click="applyStyle('indent')">&rarr;</a>
              </div>
            </div>
          </zurb-dropdown>
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
        <froala
        ref="editor"
        :tag="'textarea'"
        :config="config"
        v-model="note.body"></froala>
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
import froalaConfig from '../config/froala';

export default {
  data() {
    return {
      config: froalaConfig,
      blurSave: {},
      showMenu: false,
      currentBodyLength: 0,
      shouldUpdate: true // TODO: Determine if the body has been changed which requires an update
    }
  },

  props: ['note'],

  methods: {
    saveNote() {
      this.clearBlurSave();

      this.currentBodyLength = this.note.body ? this.note.body.length : 0;

      this.$store.dispatch('notes/update', this.note);
    },

    favoriteNote() {
      this.clearBlurSave();

      this.$set(this.note, 'favorited', this.note.favorited == null ? true : null);

      this.saveNote();
    },

    deleteNote(note) {
      this.clearBlurSave();

      this.$store.dispatch('notes/destroy', note);
    },

    blurSaveNote() {
      this.blurSave = this.shouldUpdate ? setTimeout(() => this.saveNote(), 750) : {};
    },

    clearBlurSave() {
      clearTimeout(this.blurSave);
    },

    insertElement(type) {
      $(this.$refs.editor.$el).froalaEditor('paragraphFormat.apply', type);
    },

    insertList(type) {
      $(this.$refs.editor.$el).froalaEditor('lists.format', type);
    },

    applyStyle(type) {
      $(this.$refs.editor.$el).froalaEditor(`commands.${type}`);
    }
  },

  created() {

  },

  mounted() {
    this.$eventHub.$on('note-selected', () => {
      this.showMenu = false;
      this.currentBodyLength = this.note.body ? this.note.body.length : 0;
    });

    this.$eventHub.$on('note-updated', (note) => {
      if (this.note.id === note.id) {
        // let diff = Diff.diff(this.note.body, note.body);

        // let vm = this;
        // Diff.observableDiff(vm.note, note, function (d) {
        //   Diff.applyDiff(vm.note, note);
        // });

        let newNote = '';
        let diff = this.$diff.diffChars(this.note.body, note.body);

        diff.forEach(function(part){
          newNote += part.value;
        });

        console.log(newNote);

        // let edits = this.note.body ? this.note.body.substring(this.currentBodyLength) : '';

        // this.currentBodyLength = note.body ? note.body.length : 0;

        // note.body = (note.body) ? note.body.concat('', edits) : edits;

        // this.$store.commit('notes/editItem', note);
        // this.$store.commit('notes/activeItem', note);
      } else {
        this.$store.commit('notes/editItem', note);
      }
    });

    this.$eventHub.$on('note-deleted', (note) => {
      if (this.note.id === note.id) {
        this.$store.commit('notes/activeItem', {});
      }
    });

    let vm = this;
    $(this.$refs.editor.$el)
    .on('froalaEditor.blur', (e) => vm.blurSaveNote())
  }
}
</script>

