<template lang="pug">
  q-card
    q-card-section
      div.q-mb-md.sm-hide.xs-hide
        q-badge(color="blue-grey-1" text-color="dark") {{ value.profIndustry.description }}
      div.row
        div.col-md.col-lg.col-xs-12.col-sm-12.q-pr-md-md.q-pr-md-lg
          div.text-h6
            router-link.no-text-decoration.break-word(
              :class="{'text-black': !$q.dark.isActive, 'text-white': $q.dark.isActive}"
              :to="{ name: 'services-vacancies-item', params: { id: value.id } }"
            )
              | {{ value.position }}
          div.text-caption.text-grey-8 {{ value.companyName }}
          div.text-body2.q-mt-md.rich-text.break-word {{ value.duties }}

        div.column.col-md-auto.col-mdlg-auto.items-md-end.items-lg-end.col-xs-12.col-sm-12.q-mt-xs-lg.q-mt-xs-lg
          div.text-h6.text-blue-9.col.sm-hide.xs-hide {{ $n(value.salary, 'currency', 'ru') }}
          div.text-center(v-if="isUserNature")
            q-btn(
              v-if="!value.respondIsPresent"
              :label="$t('entity.services.vacancies.respond')"
              :class="{ 'full-width': $q.screen.sm || $q.screen.xs }"
              @click="$emit('respond')"
              unelevated
              color="primary"
            )
            span.text-grey-8(v-else) {{ $t('entity.services.vacancies.respondPresent') }}
</template>
<script>
  import { mapGetters } from "vuex";

  export default {
    props: {
      value: { type:Object, default:() => ({}) }
    },
    computed: {
      ...mapGetters(["isUserNature"])
    }
  };
</script>
