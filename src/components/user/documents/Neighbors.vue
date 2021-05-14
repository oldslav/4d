<template lang="pug">
  .full-width
    q-tabs(v-model="currentTab" align="left" dense)
      q-tab(v-for="(tab, index) in neighbors" :key="index" :disable="isChanged" :name="index")
        q-tooltip(v-if="isChanged")
          | Сохраните или отмените изменения, чтобы переключить вкладку
        div.flex.items-center
          | {{ tab | neighborName(index) }}
          q-btn.q-ml-sm(round size="sm" dense flat icon="o_delete" @click.stop="onRemove(index)")
      q-btn-dropdown(flat auto-close icon="add")
        q-list
          q-item(clickable @click="addNeighbor(5)")
            q-item-section
              | {{$t("entity.neighbors.spouse")}}
          q-item(clickable @click="addNeighbor(4)")
            q-item-section
              | {{$t("entity.neighbors.child")}}
    q-tab-panels(v-model="currentTab" animated keep-alive)
      q-tab-panel.q-px-none(v-for="(neighbor, index) in neighbors" :name="index" :key="index")
        neighbor-resolver(v-model="neighbors[index]" @remove="removeNeighbor" :backup="getNeighbors[index]" :index="index" @removeFile="onRemoveFile")
</template>

<script>
  import { mapActions, mapGetters, mapMutations } from "vuex";
  import { isEqual } from "lodash";
  import NeighborResolver from "components/user/documents/NeighborResolver";
  import BaseTabs from "components/common/BaseTabs";
  import { DELETE_USER_NEIGHBOR } from "@/store/constants/action-constants";
  import { SET_DELETED_ID } from "@/store/constants/mutation-constants";

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
    name: "Neighbors",
    components: { BaseTabs, NeighborResolver },
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
        currentTab: 0
      };
    },
    computed: {
      ...mapGetters("user/neighbors", ["getNeighbors"]),
      isChanged () {
        return !isEqual(this.getNeighbors, this.neighbors);
      }
    },
    methods: {
      ...mapActions("user/neighbors", { deleteNeighbor: DELETE_USER_NEIGHBOR }),
      ...mapMutations("user/neighbors", [SET_DELETED_ID]),
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
      onRemoveFile (id) {
        this.SET_DELETED_ID(id);
      },
      removeNeighbor (index) {
        if (!!this.neighbors[index].id) {
          this.deleteNeighbor(this.neighbors[index].id)
            .then(() => {
              this.$q.notify({
                type: "positive",
                message: this.$t("entity.neighbors.messages.delete.success")
              });
            })
            .catch(() => {
              this.$q.notify({
                type: "negative",
                message: this.$t("entity.neighbors.messages.delete.fail")
              });
            });
        } else {
          this.neighbors.splice(index, 1);
        }
      },
      addNeighbor (id) {
        this.neighbors.push(defaultNeighbor(id));
        this.currentTab = this.neighbors.length - 1;
      }
    },
    watch: {
      neighbors: {
        deep: true,
        handler (value) {
          this.$emit("input", value);
        }
      },
      getNeighbors: {
        deep: true,
        handler (val) {
          this.neighbors = JSON.parse(JSON.stringify(val));
        }
      }
    }
  };
</script>
