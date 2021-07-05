<template lang="pug">
  .row
    .col-12.q-mb-sm(v-for="(neighbor, index) in model" :key="index")
      q-expansion-item(
        switch-toggle-side
        expand-separator
        group="neighbors"
      )
        template(#header)
          .flex.items-center.justify-between.full-width
            div.text-subtitle.ellipsis.text-no-wrap(:style="{flex: 1}")
              | {{ neighbor.name.full }}
            div.q-gutter-sm
              q-icon(name="o_edit" size="sm" color="primary").cursor-pointer
              q-icon(name="o_delete" size="sm" color="primary" @click.stop="removeNeighbor(index)").cursor-pointer
        q-card
          q-card-section
            NeighborResolver(v-model="model[index]" :backup="model[index]" :index="index" readonly)
    q-btn-dropdown(
      flat
      color="primary"
      label="Добавить сожителя"
      icon="add"
      menu-anchor="bottom left"
      menu-self="top start"
    ).full-width
      q-list
        q-item(v-for="(available, index) in availableNeighbors" :key="index" clickable @click="addExistingNeighbor(available)")
          q-item-section
            | {{ available.name.full }}
        q-item(clickable)
          q-item-section Новый
          q-item-section(side)
            q-icon(name="keyboard_arrow_right")
          q-menu(anchor="top end" self="top start")
            q-list
              q-item(clickable v-close-popup)
                q-item-section Супруг(а)
              q-item(clickable v-close-popup)
                q-item-section Ребёнок
</template>

<script>
  import { mapGetters } from "vuex";
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
    created () {
      // eslint-disable-next-line no-console
      console.log(this.availableNeighbors);
    },
    data () {
      return {
        model: []
      };
    },
    computed: {
      ...mapGetters("user/neighbors", ["getNeighbors"]),
      availableNeighbors () {
        const modelIds = this.model.map((m) => m.id);
        return this.getNeighbors.filter((n) => !modelIds.includes(n.id));
      }
    },
    methods: {
      removeNeighbor (index) {
        this.model.splice(index, 1);
        this.onInput();
      },
      addExistingNeighbor (neighbor) {
        this.model.push(JSON.parse(JSON.stringify(neighbor)));
        this.onInput();
      },
      addNewNeighbor (id) {
        this.model.push(defaultNeighbor(id));
      },
      onInput () {
        this.$emit("input", this.model);
      }
    }
  };
</script>
