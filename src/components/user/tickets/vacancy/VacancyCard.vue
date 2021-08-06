<template lang="pug">
  q-card
    q-card-section
      .row.q-col-gutter-sm.items-center
        div.text-h6.col-grow {{ value.position }}

        div(v-if="!readonly")

          div(v-if="!visibleForm")
            q-btn(
              @click="onClickEdit"
              :label="$t('user.tickets.vacancies.edit')"
              color="primary"
              size="12px"
              outline
            )

          div(v-if="visibleForm")
            q-btn.q-mr-lg.xs-hide(
              @click="onClickCancelChange"
              :label="$t('action.cancel')"
              outline
              flat
              color="primary"
            )
            q-btn.q-mr-lg.xs-show.sm-hide(
              @click="onClickCancelChange"
              icon="close"
              outline
              round
              color="primary"
            )

            q-btn.xs-hide(
              @click="onSubmitForm"
              :disable="!isValidForm"
              :label="$t('action.save')"
              color="primary"
              size="12px"
            )
            q-btn.xs-show.sm-hide(
              @click="onSubmitForm"
              :disable="!isValidForm"
              color="primary"
              icon="done"
              outline
              round
            )

    q-separator

    q-card-section
      vacancy-card-body(v-if="!visibleForm" v-model="value")
      vacancy-form(
        v-else
        ref="form"
        :value="value"
        :visible-actions="false"
        :is-valid.sync="isValidForm"
        @submit="onSubmitForm"
      )
</template>
<script>
  import VacancyCardBody from "./VacancyCardBody";
  import VacancyForm from "../../../forms/tickets/VacancyForm";

  export default {
    components: { VacancyForm, VacancyCardBody },
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      readonly: {
        type: Boolean,
        default: false
      },
      editorMode: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        visibleForm: false,
        isValidForm: false
      };
    },
    methods: {
      onClickEdit () {
        this.visibleForm = true;
      },

      onClickCancelChange () {
        this.visibleForm = false;
      },

      onSubmitForm () {
        if (!this.isValidForm) {
          return;
        }

        this.$emit("submit", this.$refs.form.getValues());
      }
    },
    watch:{
      visibleForm (val){
        this.$emit("update:editorMode", val);
      },
      editorMode (val) {
        this.visibleForm = val;
      }
    }
  };
</script>
