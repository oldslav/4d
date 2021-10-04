<template lang="pug">
  q-page.bg-white
    // DESKTOP
    div.row.service-vacancy-item-box.q-pa-lg.sm-hide.xs-hide
      div.col-md-8.q-pr-lg
        q-card.q-mb-lg
          q-card-section
            div.text-h6.q-mb-md {{ $t('entity.services.vacancies.duties') }}
            div.text-body1.rich-text.break-word {{ getCurrentVacancy.duties }}

        q-card.q-mb-lg
          q-card-section
            div.text-h6.q-mb-md {{ $t('entity.services.vacancies.requirements') }}
            div.text-body1.rich-text.break-word {{ getCurrentVacancy.requirements }}

        q-card.q-mb-lg
          q-card-section
            div.text-h6.q-mb-md {{ $t('entity.services.vacancies.conditions') }}
            div.text-body1.rich-text.break-word {{ getCurrentVacancy.conditions }}

      div.col-md-4
        q-card.q-mb-lg.full-height
          q-card-section
            div
              div.float-right
                q-img(
                  src="https://placeimg.com/500/300/nature"
                  style="height: 64px; width: 64px"
                  spinner-color="primary"
                )
              div.q-pt-lg.q-mb-lg
                div.text-h6.q-mb-xs {{ getCurrentVacancy.company.name }}
                div.text-body2.rich-text {{ getCurrentVacancy.company.description }}
              q-separator

            div.q-pt-lg
              div.text-caption.text-grey-8.q-mb-sm {{ $t('common.address') }}
              div.text-body2 {{ getCurrentVacancy.company.address }}

            div.q-pt-lg
              div.text-caption.text-grey-8.q-mb-sm {{ $t('common.phone') }}
              div.text-body2 {{ getCurrentVacancy.company.phone }}

            div.q-pt-lg
              div.text-caption.text-grey-8.q-mb-sm {{ $t('entity.companyProfile.site') }}
              div.text-body2
                a(:href="getCurrentVacancy.company.site" target="_blank").text-blue {{ getCurrentVacancy.company.site }}

            div.q-pt-lg
              div.text-caption.text-grey-8.q-mb-sm {{ $t('entity.services.vacancies.workTime') }}
              div.text-body2 {{ getCurrentVacancy.company.workTime }}

    // MOBILE
    div.md-hide.lg-hide
      aside-services-vacancy-item(extended)
</template>

<script>
  import { mapGetters } from "vuex";
  import AsideServicesVacancyItem from "../../../components/aside/services/AsideServicesVacancyItem";
  import { FETCH_VACANCY } from "../../../store/constants/action-constants";

  export default {
    name: "ServiceVacancyItemPage",
    components: { AsideServicesVacancyItem },
    preFetch ({ store, currentRoute }) {
      return store.dispatch(`services/vacancy/${ FETCH_VACANCY }`, currentRoute.params.id);
    },
    computed: {
      ...mapGetters("services/vacancy", ["getCurrentVacancy"])
    }
  };
</script>
<style>
.service-vacancy-item-box {
  min-height: inherit;
  box-sizing: border-box;
}
</style>
