<template lang="pug">
  div
    base-table(
      v-if="data"
      row-key="id"
      :columns="columns"
      :data="data"
      :getData="() => []"
      :loading="isLoading"
      :expanded="[]"
    )
</template>

<script>
  import BaseTable from "components/common/BaseTable";

  export default {
    name: "UserTicketsIdeas",
    components: { BaseTable },
    data () {
      return {
        data: {}
      };
    },
    computed: {
      columns () {
        return [
          {
            name: "address",
            label: "Address",
            align: "left"
          },
          {
            name: "date",
            label: "Date",
            align: "left"
          },
          {
            name: "status",
            label: "Status",
            align: "left"
          }
        ];
      },
      isLoading () {
        return false;
      }
    }
  };
</script>

<style lang="stylus"></style>
