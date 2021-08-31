<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ $t("action.back") }}
    q-separator

    template(v-if="isStatusForm")
      TreeStatusForm(
        :selected-tree="selectedTree"
        @success="showSuccessNotify"
        @fail="showFailNotify"
      )

    template(v-else-if="selectedTree.id")
      q-tabs(v-model="currentTab")
        q-tab(name="status" label="Статус")
        q-tab(name="description" label="Описание")
      q-tab-panels(v-model="currentTab")
        q-tab-panel.column(name="status")
          q-list
            q-item.row(v-if="images && images.length > 0")
              q-img.col-2.q-ml-sm(
                v-for="(image, index) in images"
                :key="index"
                :src="getImagePreview(image.imagePath)"
                )
            q-item
              q-input(readonly label="Состояние" :value="getStatusName(selectedTree.status.id)" borderless)
            q-item(v-if="selectedTree.request && selectedTree.request.description")
              q-input(readonly label="Комментарий" :value="selectedTree.request.description" borderless)
            q-separator
            q-item
              q-input(readonly label="Статус изменен" :value="formatStatusChangeDate(selectedTree.updated)" borderless)
            q-item(v-if="changedByLastName && changedByFirstName")
              q-input(readonly label="Изменил статус" :value="`${changedByLastName} ${changedByFirstName}`" borderless)
            q-btn.full-width(color="primary" label="Редактировать описание" @click="changeStatus(selectedTree.id)")
        q-tab-panel(name="description")
          q-list
            q-item
              q-input(readonly label="Тип объекта" :value="selectedTree.plant.type" borderless)
            q-item
              q-input(readonly label="Категория объекта" :value="selectedTree.plant.name" borderless)
            q-item(v-if="getGeometry")
              q-input(readonly label="Координаты" :value="getGeometry" borderless)
            q-item(v-if="selectedTree.plantedYear")
              q-input(readonly label="Год посадки" :value="selectedTree.plantedYear" borderless)
          q-btn.full-width(color="primary" label="Редактировать описание" @click="changeStatus(selectedTree.id)")
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import BaseTabs from "@/components/common/BaseTabs";
  import TreeStatusForm from "@/components/forms/services/trees/TreeStatusForm.vue";
  import { GET_TREES_STATS } from "@/store/constants/action-constants";

  export default {
    name: "AsideServicesTrees",
    components: { BaseTabs, TreeStatusForm },
    created () {
      this.GET_TREES_STATS();
    },
    data () {
      return {
        isStatusForm: false,
        currentTab: "status"
      };
    },
    computed: {
      ...mapState("services/trees", ["treesStats", "selectedTree"]),
      images () {
        return this.selectedTree.request ? this.selectedTree.request.images : null;
      },
      changedByLastName () {
        return this.selectedTree.request ? this.selectedTree.request.author.name.last : "";
      },
      changedByFirstName () {
        return this.selectedTree.request ? this.selectedTree.request.author.name.first : "";
      },
      getGeometry () {
        return this.selectedTree.geometry ? `${ this.selectedTree.geometry.x.toFixed(3) }, ${ this.selectedTree.geometry.y.toFixed(3) }` : "";
      }
    },
    methods: {
      ...mapActions("services/trees", [
        GET_TREES_STATS
      ]),
      getImagePreview (src) {
        return process.env.SERVER_API_HOST + src;
      },
      getStatusName (id) {
        if (id === 1) return "Хорошее";
        if (id === 2) return "Болеет";
        return "Погибло";
      },
      formatStatusChangeDate (changeDate) {
        const date = new Date(changeDate);
        return date.toLocaleDateString();
      },
      changeStatus () {
        this.isStatusForm = true;
      },
      showSuccessNotify () {
        this.$q.notify({
          type: "positive",
          message: "Статус успешно изменен"
        });
        this.isStatusForm = false;
      },
      showFailNotify () {
        this.$q.notify({
          type: "negative",
          message: "Возникла ошибка при обновлении статуса"
        });
      },
      clickBack () {
        if (isStatusForm) this.isStatusForm = false;
        else return this.router.back();
      }
    }
  };
</script>
