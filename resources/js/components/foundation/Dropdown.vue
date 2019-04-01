<template>
  <div class="dropdown-pane" :id="id" data-dropdown>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        defaultOptions: {
          closeOnClick: true
        }
      }
    },

    props: {
      id: {
        type: String,
        required: true
      },
      options: Object
    },

    created() {
      this.defaultOptions = Object.assign(this.defaultOptions, this.options);
    },

    mounted() {
      let elem = new Foundation.Dropdown($(this.$el), this.defaultOptions);

      $('.button', $(this.$el)).on('click', () => {
        $(this.$el).foundation('close');
      })
    },

    beforeDestroy() {
      $(this.$el).foundation('_destroy');
    }
  }
</script>
