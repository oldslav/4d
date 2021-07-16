<template lang="pug">
  q-card
    q-card-section
      q-badge(color="blue-grey-1" text-color="dark") {{ value.profIndustry.description }}
      div.row
        div.col-md-9
          div.text-h6.q-mt-md {{ value.position }}
          div.text-caption.text-grey-8 {{ value.companyName }}
          div.text-body2.q-mt-md {{ value.duties }}

        div.col-md-3.column.items-end
          div.col.text-h6.text-blue-9 {{ $n(value.salary, 'currency', 'ru') }}
          div
            q-btn(
              unelevated
              color="primary"
              :label="$t('entity.services.vacancies.respond')"
            )
</template>
<script>
  export default {
    props:{
      value: { type:Object, default:() => ({}) }
    }
  };
</script>
