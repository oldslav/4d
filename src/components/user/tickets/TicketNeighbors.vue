<template lang="pug">
  .row
    .col-12.q-mb-sm(v-for="(neighbor, index) in model" :key="index")
      q-expansion-item(
        switch-toggle-side
        group="neighbors"
        ref="ei"
      )
        template(#header)
          .flex.items-center.justify-between.full-width
            div.text-subtitle.ellipsis.text-no-wrap(:style="{flex: 1}")
              | {{ neighborName(neighbor.name) }}
            div
              q-btn(flat icon="o_edit" :color="editing === index ? `grey` : `primary`" @click.stop="edit(index)").q-mr-sm
              q-btn(flat icon="o_delete" color="primary" :disable="editing !== null" @click.stop="removeNeighbor(index)")
        q-card
          q-card-section
            NeighborResolver(v-model="model[index]" :backup="model[index]" :index="index" :readonly="editing !== index" @input="onInput()" @remove="removeNeighbor")
    q-btn-dropdown(
      flat
      color="primary"
      :label="$t('entity.neighbors.add')"
      icon="add"
      menu-anchor="bottom left"
      menu-self="top start"
    ).full-width
      q-list
        q-item(v-for="(available, index) in availableNeighbors" :key="index" clickable v-close-popup @click="addExistingNeighbor(available)")
          q-item-section
            | {{ available.name.full }}
        q-item(clickable)
          q-item-section
            | {{$t("entity.neighbors.add")}}
          q-item-section(side)
            q-icon(name="keyboard_arrow_right")
          q-menu(anchor="top end" self="top start")
            q-list
              q-item(clickable v-close-popup @click="addNewNeighbor(5)")
                q-item-section
                  | {{$t("entity.neighbors.spouse")}}
              q-item(clickable v-close-popup @click="addNewNeighbor(4)")
                q-item-section
                  | {{$t("entity.neighbors.child")}}
</template>

<script>
  import { cloneDeep } from "lodash";
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
    data () {
      return {
        model: [],
        editing: null
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
      neighborName (name) {
        if (!!name.full) {
          return name.full;
        }
        if (!!name.first) {
          return name.first;
        }
        return this.$t("entity.neighbors.add");
      },
      async edit (index) {
        if (this.editing === index) {
          this.editing = null;
        } else {
          this.editing = index;
          await this.$nextTick();
          this.$refs.ei[index].show();
        }
      },
      removeNeighbor (index) {
        this.model.splice(index, 1);
        this.onInput();
      },
      addExistingNeighbor (neighbor) {
        this.model.push(cloneDeep(neighbor));
        this.onInput();
      },
      addNewNeighbor (id) {
        this.model.push(defaultNeighbor(id));
        this.onInput();
        this.edit(this.model.length - 1);
      },
      onInput () {
        this.$emit("input", this.model);
      }
    }
  };
</script>
