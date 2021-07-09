<script>
  export default {
    name: "BaseFieldMixin",
    mounted () {
      this.validate = this.$refs.field.validate(); // assign this ref to every custom field
    }
  };
</script>
