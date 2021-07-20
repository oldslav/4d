<template lang="pug">
  div.column.aside-services-vacancy
    div.col
      q-list
        q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
          q-item-section.list-item-avatar(avatar)
            q-icon.text-primary(name="arrow_back")
          q-item-section(avatar)
            | {{ getCurrentVacancy.position }}

        q-separator

        div.q-px-md.q-py-md
          div.q-mb-lg
            div.text-caption.text-grey-8.q-mb-sm {{ $t('entity.services.vacancies.salary') }}
            div.text-body2 {{ $n(getCurrentVacancy.salary, 'currency', 'ru') }}

          div.q-mb-lg
            div.text-caption.text-grey-8.q-mb-sm {{ $t('entity.services.vacancies.experience') }}
            div.text-body2 {{ getCurrentVacancy.experience.description }}

          div.q-mb-lg
            div.text-caption.text-grey-8.q-mb-sm {{ $t('entity.services.vacancies.employmentType') }}
            div.text-body2 {{ getCurrentVacancy.employmentType.description }}

          div.q-mb-lg
            div.text-caption.text-grey-8.q-mb-sm {{ $t('entity.services.vacancies.employmentType') }}
            div.text-body2 {{ getCurrentVacancy.workSchedule.description }}

          div.q-mb-lg
            div.text-caption.text-grey-8.q-mb-sm {{ $t('common.address') }}
            div.text-body2 {{ getCurrentVacancy.address }}

    div.q-px-md.q-py-md
      q-btn.full-width(
        v-if="!getCurrentVacancy.respondIsPresent"
        :label="$t('entity.services.vacancies.sendRespond')"
        @click="onClickRespondVacancy"
        color="primary"
      )
      div.text-center.text-grey-8(v-else)
        | {{ $t('entity.services.vacancies.respondPresent') }}

    vacancy-respond-modal(
      v-model="visibleRespondModal"
      :vacancy-id="getCurrentVacancy.id"
    )
</template>

<script>
  import { mapGetters } from "vuex";
  import VacancyRespondModal from "../../services/vacancy/VacancyRespondModal";

  export default {
    name: "AsideServicesVacancyItem",
    components: { VacancyRespondModal },
    data (){
      return {
        visibleRespondModal: false
      };
    },
    computed: {
      ...mapGetters("services/vacancy", ["getCurrentVacancy"])
    },
    methods:{
      onClickRespondVacancy (){
        this.visibleRespondModal = true;
      }
    }
  };
</script>
<style>
.aside-services-vacancy {
  min-height: 100%;
}
</style>
