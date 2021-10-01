<template lang="pug">
  q-form(@submit="onSubmit()")
    .row.q-col-gutter-sm
      .col-12.col-sm-6.col-md-4

        div.text-medium.q-mb-sm {{ $t('user.tickets.vacancies.forms.create.details') }}

        q-input.q-mb-md(
          v-model="values.position"
          :label="$t('user.tickets.vacancies.forms.create.positionName')"
        )

        BaseSelect.q-mb-md(
          v-model="values.profIndustryId"
          :label="$t('user.tickets.vacancies.forms.create.profIndustry')"
          :options="getProfIndustryReferences"
          optionKey="id"
          optionLabel="text"
          optionValue="id"
        )

        q-input.q-mb-md(
          v-model="values.salary"
          :label="$t('user.tickets.vacancies.forms.create.salary')"
          type="number"
          min="0"
        )

        BaseSelect.q-mb-md(
          v-model="values.experienceId"
          :label="$t('user.tickets.vacancies.forms.create.experience')"
          :options="getExperienceReferences"
          optionKey="id"
          optionLabel="text"
          optionValue="id"
        )

        BaseSelect.q-mb-md(
          v-model="values.workScheduleId"
          :label="$t('user.tickets.vacancies.forms.create.schedule')"
          :options="getWorkScheduleReferences"
          optionKey="id"
          optionLabel="text"
          optionValue="id"
        )

        BaseSelect.q-mb-md(
          v-model="values.employmentTypeId"
          :label="$t('user.tickets.vacancies.forms.create.employmentType')"
          :options="getEmploymentTypeReferences"
          optionKey="id"
          optionLabel="text"
          optionValue="id"
        )

        q-input.q-mb-md(
          v-model="values.address"
          :label="$t('user.tickets.vacancies.forms.create.address')"
        )

      .col-12.col-sm-6.col-md-8.q-pl-lg-md
        div.q-mb-md
          div.text-medium.q-mb-sm {{ $t('entity.services.vacancies.duties') }}
          q-input(
            type="textarea"
            v-model="values.duties"
            :placeholder="$t('user.tickets.vacancies.forms.create.dutiesHint')"
            outlined
          )

        div.q-mb-md
          div.text-medium.q-mb-sm {{ $t('entity.services.vacancies.requirements') }}
          q-input(
            type="textarea"
            v-model="values.requirements"
            :placeholder="$t('user.tickets.vacancies.forms.create.requirementsHint')"
            outlined
          )

        div
          div.text-medium.q-mb-sm {{ $t('entity.services.vacancies.conditions') }}
          q-input.q-mb-md(
            type="textarea"
            v-model="values.conditions"
            :placeholder="$t('user.tickets.vacancies.forms.create.conditionsHint')"
            outlined
          )

      button.hidden(type="submit")
</template>

<script>
  import { mapGetters } from "vuex";
  import { VacancyReferencesEnum } from "../../../store/types/vacancy";
  import FilePicker from "components/common/FilePicker";
  import BaseAutocomplete from "components/common/BaseAutocomplete";
  import BaseSelect from "../../common/BaseSelect";

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
    components: { BaseSelect, FilePicker, BaseAutocomplete },

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
