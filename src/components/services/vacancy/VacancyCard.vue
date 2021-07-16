<template lang="pug">
  q-card
    q-card-section
      q-badge(color="blue-grey-1" text-color="dark") {{ value.profIndustry.description }}
      div.row
        div.col
          div.text-h6.q-mt-md {{ value.position }}
          div.text-caption.text-grey-8 {{ value.companyName }}
          div.text-body2.q-mt-md {{ value.duties }}

        div.column.col-auto.items-end
          div.text-h6.text-blue-9.col {{ $n(value.salary, 'currency', 'ru') }}
          div(v-if="isUserNature")
            q-btn(
              v-if="!value.respondIsPresent"
              :label="$t('entity.services.vacancies.respond')"
              @click="$emit('respond')"
              unelevated
              color="primary"
            )
            span.text-grey-8(v-else) {{ $t('entity.services.vacancies.respondPresent') }}
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    props:{
      value: { type:Object, default:() => ({}) }
    },
    computed:{
      ...mapGetters(["isUserNature"])
    }
  };
</script>
