<script>
  export default {
    name: "BaseFieldMixin",
    mounted () {
      if (process.browser) {
        this.validate = this.$refs.field.validate(); // assign this ref to every custom field
      }
    }
  };
</script>
