<template lang="pug">
  .row.q-col-gutter-sm
    .col-12.col-sm-6.col-md-4
      div.text-medium.q-mb-lg {{ $t('user.tickets.vacancies.forms.create.details') }}

      div.q-mb-lg
        div.text-caption.text-grey-8 {{ $t('user.tickets.vacancies.forms.create.profIndustry') }}
        div.text-body1.q-mt-sm.break-word {{ value.profIndustry.description }}

      div.q-mb-lg
        div.text-caption.text-grey-8 {{ $t('user.tickets.vacancies.forms.create.salary') }}
        div.text-body1.q-mt-sm {{ value.salary }}
          span.q-ml-sm руб.

      div.q-mb-lg
        div.text-caption.text-grey-8 {{ $t('user.tickets.vacancies.forms.create.experience') }}
        div.text-body1.q-mt-sm {{ value.experience.description }}

      div.q-mb-lg
        div.text-caption.text-grey-8 {{ $t('user.tickets.vacancies.forms.create.schedule') }}
        div.text-body1.q-mt-sm {{ value.workSchedule.description }}

      div.q-mb-lg
        div.text-caption.text-grey-8 {{ $t('user.tickets.vacancies.forms.create.employmentType') }}
        div.text-body1.q-mt-sm {{ value.employmentType.description }}

      div.q-mb-lg
        div.text-caption.text-grey-8 {{ $t('user.tickets.vacancies.forms.create.address') }}
        div.text-body1.q-mt-sm.break-word {{ value.address }}

    .col-12.col-sm-6.col-md-8.q-pl-lg-md
      div.q-mb-lg
        div.text-medium.q-mb-sm  {{ $t('entity.services.vacancies.duties') }}
        div.text-body1.rich-text.break-word {{ value.duties }}

      div.q-mb-lg
        div.text-medium.q-mb-sm  {{ $t('entity.services.vacancies.requirements') }}
        div.text-body1.rich-text.break-word {{ value.requirements }}

      div.q-mb-lg
        div.text-medium.q-mb-sm  {{ $t('entity.services.vacancies.conditions') }}
        div.text-body1.rich-text.break-word {{ value.conditions }}
</template>
<script>
  export default {
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    }
  };
</script>
