<template lang="pug">
  div(v-if="cesiumInstance").full-height.column
    q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ $t("action.back") }}
    q-separator
    .row.q-col-gutter-sm.q-px-lg(v-if="references")
      BaseInput(
        v-model="query"
        hideBottom
        dense
        :label="$t('common.search')"
      ).col-12
      BaseSelect(
        clearable
        v-model="statusId"
        :options="statuses"
        label="Статус"
        optionKey="id"
        optionValue="description"
        hideBottom
        dense
      ).col
      BaseSelect(
        clearable
        v-model="typeId"
        :options="references.crowdSourcingTypes"
        label="Тип"
        optionKey="id"
        optionValue="description"
        hideBottom
        dense
      ).col
    .column.col.q-ma-lg.overflow-auto
      q-infinite-scroll(
        :offset="50"
        :debounce="400"
        @load="getData"
      ).full-height
        q-item(clickable v-for="(item, index) in features" :key="index" @click="selectFeature(item.id)").q-px-none
          q-item-section
            q-item-label(style="max-width: 250px").ellipsis
              | {{ item.title }}
            q-item-label(caption)
              .row
                span {{ moment(item.created).format("DD.MM.YYYY") }}
                template(v-if="item.likes")
                  span.q-mx-sm |
                  q-icon(name="favorite" size="11px").q-mr-xs
                  span {{ item.likes.amount }}
        q-inner-loading(:showing="isLoading" color="primary")
    div(v-if="isUserNature").q-mx-lg.q-mb-lg
      q-btn(color="primary" :label="btnCreateLabel" @click="componentInstance.toggle('handlerPoint')").full-width
</template>

<script>
  import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
  import {
    SET_EMPTY,
    SET_FEATURE_ID,
    SET_QUERY,
    UPDATE_FILTERS,
    UPDATE_PAGINATION
  } from "../../../store/constants/mutation-constants";
  import { GET_DATA } from "../../../store/constants/action-constants";
  import { mapFields } from "../../../plugins/mapFields";
  import BaseSelect from "../../common/BaseSelect";
  import moment from "moment";
  import BaseInput from "../../common/BaseInput";

  export default {
    name: "AsideServicesIdeas",
    components: { BaseInput, BaseSelect },
    data () {
      return {
        componentInstance: null
      };
    },
    computed: {
      ...mapGetters(["isUserNature"]),

      ...mapState("services", {
        cesiumInstance: state => state.cesiumInstance
      }),

      ...mapState("services/ideas", {
        data: state => state.data,
        filters: state => state.filters,
        references: state => state.references
      }),

      ...mapFields("services/ideas", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),

      ...mapFields("services/ideas", {
        fields: ["statusId", "typeId", "query"],
        base: "filters",
        mutation: UPDATE_FILTERS
      }),

      statuses () {
        const blockedStatuses = [1, 5, 8];

        return this.references && this.references.crowdSourcingStatuses.filter(i => !blockedStatuses.includes(i.id));
      },

      isDrawing () {
        return this.componentInstance.$refs.handlerPoint.drawing;
      },

      features () {
        return this.data && this.data.items;
      },

      isLoading () {
        return this.$store.state.wait[`services/ideas/${ GET_DATA }`];
      },

      btnCreateLabel () {
        if (this.isDrawing) {
          return "Отметьте место на карте";
        } else return "Создать заявку";
      }
    },
    methods: {
      moment,

      ...mapMutations("services", [
        SET_FEATURE_ID
      ]),

      ...mapMutations("services/ideas", [
        UPDATE_PAGINATION,
        UPDATE_FILTERS,
        SET_QUERY,
        SET_EMPTY
      ]),

      ...mapActions("services/ideas", {
        GET_DATA
      }),

      async getData (i, done) {
        if (this.data) {
          if (this.offset * this.limit + i > this.data.count) return false;
          else this.offset = i;
        }

        await this.GET_DATA();
        done();
      },

      selectFeature (id) {
        this.SET_FEATURE_ID(id);
      }
    },
    watch: {
      cesiumInstance: {
        immediate: true,
        handler (value) {
          if (value) {
            this.componentInstance = this.$root.map.componentInstance;
          }
        }
      },

      filters: {
        deep: true,
        async handler () {
          await this.GET_DATA(true);
        }
      }
    },
    beforeDestroy () {
      this.SET_EMPTY();
    }
  };
</script>

<style scoped>

</style>
