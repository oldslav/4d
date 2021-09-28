<template lang="pug">
  div.column.aside-services-vacancy
    div.col
      q-list
        q-item.q-py-lg.text-subtitle(clickable @click="$router.back()")
          q-item-section.list-item-avatar(avatar)
            q-icon.text-primary(name="arrow_back")
          q-item-section.break-word(avatar)
            | {{ getCurrentVacancy.position }}

        q-separator

        div.q-px-md.q-py-md
          div.q-mb-lg
            div.text-caption.text-grey-8.q-mb-sm {{ $t('entity.services.vacancies.salary') }}
            div.text-body2 {{ $n(getCurrentVacancy.salary, 'currency', 'ru') }}

          div.q-mb-lg
            div.text-caption.text-grey-8.q-mb-sm {{ $t('entity.services.vacancies.experience') }}
            div.text-body2 {{ getCurrentVacancy.experience.text }}

          div.q-mb-lg
            div.text-caption.text-grey-8.q-mb-sm {{ $t('entity.services.vacancies.employmentType') }}
            div.text-body2 {{ getCurrentVacancy.employmentType.text }}

          div.q-mb-lg
            div.text-caption.text-grey-8.q-mb-sm {{ $t('entity.services.vacancies.employmentType') }}
            div.text-body2 {{ getCurrentVacancy.workSchedule.text }}

          div.q-mb-lg
            div.text-caption.text-grey-8.q-mb-sm.break-word {{ $t('common.address') }}
            div.text-body2 {{ getCurrentVacancy.address }}

    div.q-px-md(v-if="extended")
      div.q-mb-lg
        div.text-h6.q-mb-md {{ $t('entity.services.vacancies.duties') }}
        div.text-body1.rich-text.break-word {{ getCurrentVacancy.duties }}

      div.q-mb-lg
        div.text-h6.q-mb-md {{ $t('entity.services.vacancies.requirements') }}
        div.text-body1.rich-text.break-word {{ getCurrentVacancy.requirements }}

      div.q-mb-lg
        div.text-h6.q-mb-md {{ $t('entity.services.vacancies.conditions') }}
        div.text-body1.rich-text.break-word {{ getCurrentVacancy.conditions }}

    div.q-px-md.q-py-md.bg-white(
      v-if="isUserNature"
      :class="{'aside-vacancy-respond-sticky': $q.screen.sm || $q.screen.xs, 'aside-vacancy-respond-sticky__mobile': !$q.platform.is.desktop}"
    )
      q-btn.full-width(
        v-if="!getCurrentVacancy.respondIsPresent"
        :label="$t('entity.services.vacancies.sendRespond')"
        @click="onClickRespondVacancy"
        color="primary"
        unelevated
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
    props: {
      extended: { type: Boolean, default: false }
    },
    data (){
      return {
        visibleRespondModal: false
      };
    },
    computed: {
      ...mapGetters("services/vacancy", ["getCurrentVacancy"]),
      ...mapGetters(["isUserNature"])
    },
    methods: {
      onClickRespondVacancy (){
        this.visibleRespondModal = true;
      }
    }
  };
</script>
<style lang="stylus">
.aside-services-vacancy
  min-height: 100%;

.aside-vacancy-respond-sticky
  position: sticky;
  background: $background;
  bottom: 0;

.aside-vacancy-respond-sticky__mobile
  bottom: 48px;
</style>
