<template lang="pug">
  q-form(@submit.stop.prevent="onSubmit()")
    q-input(
      v-model="number"
      :rules="[ val => val !== null && val !== '' || '']"
      :label="$t('user.bills.contractNumber')"
      type="number"
    )
    q-input(
      :value="innerValue"
      :label="$t('entity.tickets.contract.dateRange')"
      lazy-rules
      readonly
      :rules="[ () => !!range.to && !!range.from || '']"
      @click="$refs.dateRange.show()"
    )
      template(v-slot:prepend)
        q-icon(name="event" class="cursor-pointer")
          q-popup-proxy(ref="dateRange")
            q-date(
              v-model="range"
              :options="startOptions"
              range
              :mask="'YYYY-MM-DD'"
              @input="$refs.dateRange.hide()"
            )
    .text-right
      q-btn(color="primary" label="Далее" type="submit" :disabled="!contractValid")
</template>

<script>
  import moment from "moment";

  export default {
    name: "FormContract",
    data () {
      return {
        number: null,
        range: {
          from: null,
          to: null
        },
        startOptions: date => moment(date).isSameOrAfter(moment())
      };
    },
    computed: {
      contractValid () {
        return !!this.number && Object.values(this.range).every((v) => !!v);
      },
      innerValue () {
        return `${ this.range.from || "" } - ${ this.range.to || "" }`;
      }
    },
    methods: {
      onSubmit () {
        const { number, range: { from, to } } = this;
        const payload = {
          number,
          startDate: from,
          endDate: to
        };
        this.$emit("submit", payload);
      }
    }
  };
</script>
