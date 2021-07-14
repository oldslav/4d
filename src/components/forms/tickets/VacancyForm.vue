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
          type="number"
          min="0"
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

      button.hidden(type="submit")
</template>

<script>
  import { mapGetters } from "vuex";
  import { VacancyReferencesEnum } from "../../../store/types/vacancy";
  import FilePicker from "components/common/FilePicker";
  import BaseAutocomplete from "components/common/BaseAutocomplete";

  const defaults = (vacancy = {}) => ({
    position: vacancy.position || "",
    profIndustryId: vacancy.profIndustry ? vacancy.profIndustry.id : null,
    experienceId: vacancy.experience ? vacancy.experience.id : null,
    workScheduleId: vacancy.workSchedule ? vacancy.workSchedule.id : null,
    employmentTypeId: vacancy.employmentType ? vacancy.employmentType.id : null,
    salary: vacancy.salary || "",
    address: vacancy.address || "",
    conditions: vacancy.conditions || "",
    requirements: vacancy.requirements || "",
    duties: vacancy.duties || ""
  });

  export default {
    name: "VacancyForm",
    components: { FilePicker, BaseAutocomplete },

    props: {
      value: { type: Object, default: () => ({}) },
      visibleActions: { type: Boolean, default: true },
      isValid: { type: Boolean, default: false }
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
      isValidForm () {
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
      onSubmit () {
        this.submit();
      },

      getValues () {
        return this.values;
      },

      submit () {
        if (this.isValidForm) {
          this.$emit("submit", this.values);
        }
      }
    },

    watch: {
      value: {
        immediate: true,
        handler () {
          this.values = defaults(this.value);
        }
      },
      values: {
        immediate: true,
        deep: true,
        handler () {
          this.$emit("update:isValid", this.isValidForm);
        }
      }
    }
  };
</script>
