<script>
  import SpouseForm from "components/forms/documents/SpouseForm";
  import ChildForm from "components/forms/documents/ChildForm";

  export default {
    name: "NeighborResolver",
    render (createElement, context) {
      const { value } = context.props;
      const id = !!value.neighborType ? value.neighborType.id : value.neighborTypeId;
      let component;
      if (id === 5) {
        component = SpouseForm;
      } else if (id === 4) {
        component = ChildForm;
      }
      return createElement(component, context.data, context.children);
    },
    functional: true
  };
</script>
