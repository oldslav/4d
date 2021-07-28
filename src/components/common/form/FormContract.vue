<template lang="pug">
  q-form(@submit.stop.prevent="onSubmit()")
    q-input(
      v-model="model.number"
      :rules="[ val => val !== null && val !== '' || '']"
      :label="$t('user.bills.contractNumber')"
    )
    .row.q-col-gutter-sm
      .col-6
        q-input(
          ref="date"
          filled
          v-model="model.startDate"
          :label="$t('user.bills.dateContractConcluded')"
          lazy-rules
          :rules="[ val => val !== null && val !== '' || '']"
          @click="$refs.qDateConcludedProxy.show()"
        )
          template(v-slot:append)
            q-icon(name="event" class="cursor-pointer")
              q-popup-proxy(ref="qDateConcludedProxy")
                q-date(
                  v-model="model.startDate"
                  :options="startOptions"
                  :mask="'YYYY-MM-DD'"
                  @input="$refs.qDateConcludedProxy.hide()"
                )
      .col-6
        q-input(
          ref="date"
          filled
          v-model="model.endDate"
          :label="$t('user.bills.dateContractExpire')"
          lazy-rules
          :rules="[ val => val !== null && val !== '' || '']"
          @click="$refs.qDateExpireProxy.show()"
          :disable="!model.startDate"
        )
          template(v-slot:append)
            q-icon(name="event" class="cursor-pointer")
              q-popup-proxy(ref="qDateExpireProxy")
                q-date(
                  v-model="model.endDate"
                  :mask="'YYYY-MM-DD'"
                  :options="endOptions"
                  @input="$refs.qDateExpireProxy.hide()"
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
        model: {
          number: null,
          startDate: null,
          endDate: null
        },
        startOptions: date => moment(date).isSameOrAfter(moment()),
        endOptions: date => moment(date).isAfter(moment(this.model.startDate))
      };
    },
    computed: {
      contractValid () {
        return Object.values(this.model).every((v) => !!v);
      }
    },
    methods: {
      onSubmit () {
        this.$emit("submit", this.model);
      }
    }
  };
</script>
