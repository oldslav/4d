<template lang="pug">

</template>

<script>
  import NeighborResolver from "components/user/documents/NeighborResolver";

  const defaultNeighbor = (id) => ({
    name: {
      last: null,
      full: null,
      first: null,
      noPatronymic: false,
      patronymic: null
    },
    neighborTypeId: id,
    documents: {
      inn: [],
      snils: [],
      passport: [],
      marriage: [],
      birth: [],
      children_registration: [],
      consent_processing_personal_data: []
    }
  });

  export default {
    name: "TicketNeighbors",
    components: { NeighborResolver },
    props: {
      value: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        model: []
      };
    },
    methods: {
      addNewNeighbor (id) {
        this.model.push(defaultNeighbor(id));
      }
    }
  };
</script>
