<template lang="pug">
  .row.q-col-gutter-sm
    .col-12.col-sm-6.col-md-4
      div.text-medium.q-mb-lg Детали

      div.q-mb-lg
        div.text-caption.text-grey-8 Профессиональная отрасль
        div.text-body1.q-mt-sm {{ value.profIndustry.description }}

      div.q-mb-lg
        div.text-caption.text-grey-8 Зарплата
        div.text-body1.q-mt-sm {{ value.salary }}
          span.q-ml-sm руб.

      div.q-mb-lg
        div.text-caption.text-grey-8 Опыт работы
        div.text-body1.q-mt-sm {{ value.experience.description }}

      div.q-mb-lg
        div.text-caption.text-grey-8 График работы
        div.text-body1.q-mt-sm {{ value.workSchedule.description }}

      div.q-mb-lg
        div.text-caption.text-grey-8 Тип занятости
        div.text-body1.q-mt-sm {{ value.employmentType.description }}

      div.q-mb-lg
        div.text-caption.text-grey-8 Адрес
        div.text-body1.q-mt-sm {{ value.address }}

    .col-12.col-sm-6.col-md-8.q-pl-lg
      div.q-mb-lg
        div.text-medium.q-mb-sm Обязанности
        div.text-body1 {{ value.duties }}

      div.q-mb-lg
        div.text-medium.q-mb-sm Требования
        div.text-body1 {{ value.requirements }}

      div.q-mb-lg
        div.text-medium.q-mb-sm Условия
        div.text-body1 {{ value.conditions }}
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
