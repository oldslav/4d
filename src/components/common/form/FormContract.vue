<template lang="pug">
  q-form(@submit.stop.prevent="onSubmit()")
    .row.q-col-gutter-sm
      .col-12
        q-input(
          v-model="number"
          :rules="[ val => val !== null && val !== '' || '']"
          :label="$t('user.bills.contractNumber')"
          type="number"
        )
      .col-6
        q-input(
          readonly
          :value="startDate"
          :rules="[() => !!startDate]"
          lazy-rules
          :label="$t('entity.tickets.contract.startDate')"
        )
          q-popup-proxy(ref="startProxy" :style="{minWidth: 'unset'}")
            q-date(
              v-model="startDate"
              :mask="'YYYY-MM-DD'"
              :options="startOptions"
              minimal
              @input="$refs.startProxy.hide()"
            )
      .col-6
        q-input(
          readonly
          :value="endDate"
          :disable="termless"
          lazy-rules
          :label="$t('entity.tickets.contract.endDate')"
        )
          q-popup-proxy(ref="endProxy" :style="{minWidth: 'unset'}")
            q-date(
              v-model="endDate"
              :mask="'YYYY-MM-DD'"
              :rules="!termless && [() => !!endDate]"
              minimal
              :options="endOptions"
              @input="$refs.endProxy.hide()"
            )
    .text-right.q-mt-md
      q-btn(color="primary" label="Далее" type="submit" :disabled="!contractValid")
</template>

<script>
  import moment from "moment";

  export default {
    name: "FormContract",
    props: {
      // подается поле updated заявки, т.к последнее его изменение происходит при оплате
      start: {
        type: String,
        default: null
      },
      end: {
        type: String,
        default: null
      },
      lasts: {
        type: Number,
        default: null
      },
      termless: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        number: null,
        startDate: null,
        endDate: null,
        range: {
          from: null,
          to: null
        }
      };
    },
    computed: {
      contractValid () {
        return !!this.number && this.datesValid;
      },
      datesValid () {
        if (this.termless) {
          return !!this.startDate;
        }
        return !!this.startDate && !!this.endDate;
      },
      innerValue () {
        return !!this.range.from ? `${ this.range.from || "" } - ${ this.range.to || "" }` : this.range;
      }
    },
    methods: {
      startOptions (date) {
        let floor = this.start || moment();
        return moment(date).isSameOrAfter(floor, "day");
      },
      endOptions (date) {
        let floor = this.start || moment();
        if (this.startDate) {
          floor = this.startDate;
        }
        return moment(date).isAfter(floor, "day");
      },
      onSubmit () {
        const { number, startDate, endDate } = this;
        const payload = {
          number,
          startDate,
          endDate
        };
        this.$emit("submit", payload);
      }
    },
    watch: {
      start: {
        immediate: true,
        handler (val) {
          if (val) {
            this.startDate = moment(val).format("YYYY-MM-DD");
          }
        }
      },
      end: {
        immediate: true,
        handler (val) {
          if (val && !this.lasts) {
            this.endDate = moment(val).format("YYYY-MM-DD");
          }
        }
      },
      lasts: {
        immediate: true,
        handler (val) {
          if (this.start && this.startDate && !this.termless && !!val) {
            this.endDate = moment(this.startDate).add(val, "months").format("YYYY-MM-DD");
          }
        }
      }
    }
  };
</script>
