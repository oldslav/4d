<template lang="pug">
  .full-width
    base-tabs(v-model="currentTab")
      q-tab(v-for="(tab, index) in neighbors" :key="index" :name="tab | neighborName(index)")
        div.flex.items-center
          | {{ tab | neighborName(index) }}
          q-btn.q-ml-sm(round size="sm" dense flat icon="o_delete" @click.stop="onRemove(index)")
      q-btn-dropdown(flat auto-close icon="add")
        q-list
          q-item(clickable @click="addSpouse()")
            q-item-section
              | Супруга (у)
          q-item(clickable @click="addChild()")
            q-item-section
              | Ребенка
    q-tab-panels(v-model="currentTab" animated keep-alive)
      q-tab-panel.q-px-none(v-for="(neighbor, index) in neighbors" :name="neighbor | neighborName(index)" :key="index")
        spouse-form(v-if="neighbor.neighborsTypeId === 5" :value="neighbor" @remove="removeNeighbor" :index="index")
        child-form(v-else-if="neighbor.neighborsTypeId === 4" :value="neighbor" @remove="removeNeighbor" :index="index")
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import BaseTabs from "components/common/BaseTabs";
  import SpouseForm from "components/forms/documents/SpouseForm";
  import ChildForm from "components/forms/documents/ChildForm";
  import { DELETE_USER_NEIGHBOR } from "@/store/constants/action-constants";

  const defaultChild = () => ({
    name: {
      last: null,
      full: null,
      first: null,
      noPatronymic: false,
      patronymic: null
    },
    neighborsTypeId: 4,
    documents: {
      children_registration: null,
      passport: null,
      birth: null
    }
  });

  const defaultSpouse = () => ({
    name: {
      last: null,
      full: null,
      first: null,
      noPatronymic: false,
      patronymic: null
    },
    neighborsTypeId: 5,
    documents: {
      inn: null,
      snils: null,
      passport: null,
      marriage: null
    }
  });

  export default {
    name: "Neighbors",
    components: { BaseTabs, SpouseForm, ChildForm },
    filters: {
      neighborName: (item, index) => {
        const { first } = item.name;
        if (!first) {
          return `Родственник ${ index + 1 }`;
        }
        return first;
      }
    },
    created () {
      this.cloneData();
    },
    data () {
      return {
        neighbors: null,
        currentTab: null
      };
    },
    computed: {
      ...mapGetters("user/neighbors", ["getNeighbors"])
    },
    methods: {
      ...mapActions("user/neighbors", { deleteNeighbor: DELETE_USER_NEIGHBOR }),
      cloneData () {
        this.neighbors = JSON.parse(JSON.stringify(this.getNeighbors));
      },
      onRemove (index) {
        this.$q.dialog({
          title: "Удаление",
          message: "Вы уверены, что хотите удалить этого родственника?",
          ok: "Подтвердить",
          cancel: "Отмена",
          persistent: true
        })
          .onOk(() => this.removeNeighbor(index));
      },
      removeNeighbor (index) {
        if (!!this.neighbors[index].id) {
          this.deleteNeighbor(this.neighbors[index].id);
        } else {
          this.neighbors.splice(index, 1);
        }
      },
      addSpouse () {
        this.neighbors.push(defaultSpouse());
      },
      addChild () {
        this.neighbors.push(defaultChild());
      }
    },
    watch: {
      getNeighbors: {
        deep: true,
        handler (val) {
          this.neighbors = val;
        }
      }
    }
  };
</script>
