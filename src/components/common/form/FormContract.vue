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
      template(#before)
        q-icon(name="event" class="cursor-pointer")
          q-popup-proxy(ref="dateRange" @before-show="log")
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
    props: {
      start: {
        type: String,
        default: ""
      }
    },
    data () {
      return {
        number: null,
        range: {
          from: null,
          to: null
        },
        startOptions: date => moment(date).isSameOrAfter(moment(this.start))
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
      log () {
        console.log(this.range);
      },
      onSubmit () {
        const { number, range: { from, to } } = this;
        const payload = {
          number,
          startDate: from,
          endDate: to
        };
        this.$emit("submit", payload);
      }
    },
    watch: {
      start: {
        immediate: true,
        handler (val) {
          this.range.from = moment(val).format("YYYY-MM-DD");
        }
      }
    }
  };
</script>
