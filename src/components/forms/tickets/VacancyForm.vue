<template lang="pug">
  q-form(@submit="onSubmit()")
    .row.q-col-gutter-sm
      .col-12.col-sm-6.col-md-4

        div.text-medium.q-mb-sm Детали

        q-input.q-mb-md(
          v-model="values.position"
          label='Название должности'
        )


        q-select.q-mb-md(
          v-model="values.profIndustryId"
          label="Профессиональная отрасль"
          :options="getProfIndustryReferences"
          option-value="id"
          option-label="description"
          map-options
          emit-value
        )

        q-input.q-mb-md(
          v-model="values.salary"
          label='Заработная плата (руб.)'
        )

        q-select.q-mb-md(
          v-model="values.experienceId"
          label="Опыт работы"
          :options="getExperienceReferences"
          option-value="id"
          option-label="description"
          map-options
          emit-value
        )

        q-select.q-mb-md(
          v-model="values.workScheduleId"
          label="График работы"
          :options="getWorkScheduleReferences"
          option-value="id"
          option-label="description"
          map-options
          emit-value
        )

        q-select.q-mb-md(
          v-model="values.employmentTypeId"
          label="Тип занятости"
          :options="getEmploymentTypeReferences"
          option-value="id"
          option-label="description"
          map-options
          emit-value
        )

        q-input.q-mb-md(
          v-model="values.address"
          label='Адрес офиса или рабочего места'
        )

      .col-12.col-sm-6.col-md-8.q-pl-lg
        div.q-mb-md
          div.text-medium.q-mb-sm Обязанности
          q-input(
            type="textarea"
            v-model="values.duties"
            placeholder="Подробно опишите обязанности кандидата"
            outlined
          )

        div.q-mb-md
          div.text-medium.q-mb-sm Требования
          q-input(
            type="textarea"
            v-model="values.requirements"
            placeholder="Обозначьте требования к кандидату"
            outlined
          )

        div
          div.text-medium.q-mb-sm Условия
          q-input.q-mb-md(
            type="textarea"
            v-model="values.conditions"
            placeholder="Расскажите об условиях работы и преимуществах вашей компании"
            outlined
          )

    q-stepper-navigation.q-gutter-md
      q-btn(color="primary" type="submit" label="Добавить" :disable="!isValid")
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { VacancyReferencesEnum } from "../../../store/types/vacancy";
  import FilePicker from "components/common/FilePicker";
  import BaseAutocomplete from "components/common/BaseAutocomplete";
  import { CREATE_VACANCY } from "../../../store/constants/action-constants";

  const defaults = () => ({
    position: "",
    profIndustryId: null,
    experienceId: null,
    workScheduleId: null,
    employmentTypeId: null,
    salary: "",
    address: "",
    conditions: "",
    requirements: "",
    duties: ""
  });

  export default {
    name: "VacancyForm",
    components: { FilePicker, BaseAutocomplete },

    props: {
      value: { type: Object, default: () => ({}) }
    },

    data () {
      return {
        values: defaults()
      };
    },

    computed: {
      ...mapGetters("services/vacancy", ["getVacancyReferences"]),
      getProfIndustryReferences () {
        return this.getVacancyReferences[VacancyReferencesEnum.profIndustry];
      },
      getExperienceReferences () {
        return this.getVacancyReferences[VacancyReferencesEnum.experience];
      },
      getWorkScheduleReferences () {
        return this.getVacancyReferences[VacancyReferencesEnum.workSchedule];
      },
      getEmploymentTypeReferences () {
        return this.getVacancyReferences[VacancyReferencesEnum.employmentType];
      },
      isValid () {
        const { values } = this;
        return values.position !== "" &&
          values.profIndustryId !== null &&
          values.experienceId !== null &&
          values.workScheduleId !== null &&
          values.employmentTypeId !== null &&
          values.salary !== "" &&
          values.address !== "" &&
          values.conditions !== "" &&
          values.requirements !== "" &&
          values.duties !== "";
      }
    },
    methods: {
      ...mapActions("services/vacancy", {
        createVacancy: CREATE_VACANCY
      }),

      async onSubmit () {
        const vacancy = await this.createVacancy(this.values);
        this.$emit("done", vacancy);
      }
    }
  };
</script>
