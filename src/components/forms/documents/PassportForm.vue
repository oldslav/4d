<template lang="pug">
  q-form.passpor-form.row.q-col-gutter-sm
    .col-12.col-md-6
      q-select(label="Выберите документ из списка" :options="options" v-model="model.type")
    .col-12.col-sm-6.col-md-3
      q-input(v-model.lazy="model.passportId" label="Серия и номер")
    .col-12.col-sm-6.col-md-3
      q-input(v-model="model.date" label="Дата выдачи")
        template(#append)
          q-icon.cursor-pointer.text-primary(name="o_calendar_today")
            q-popup-proxy(ref="qDateProxy" transition-show="scale" transition-hide="scale")
              q-date(v-model="model.date")
    .col-12
      q-input(v-model.lazy="model.issuedAt" label="Кем выдан")
    .col-12
      q-input(v-model.lazy="model.address" label="Адрес регистрации")
</template>

<script>
  // stub, backend
  const defaultModel = () => ({
    type: "",
    passportId: "", // or Number?
    date: "",
    issuedAt: "",
    address: ""
  });

  export default {
    name: "PassportForm",
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        model: { ...defaultModel(), ...this.value },
        // stub, receive from backend??
        options: [
          {
            value: 1,
            label: "Паспорт гражданина РФ"
          },
          {
            value: 2,
            label: "Паспорт гражданина СНГ"
          },
          {
            value: 3,
            label: "Паспорт гражданина иностранного государства"
          }
        ]
      };
    },
    watch: {
      value: {
        deep: true,
        handler (val) {
          this.model = val;
        }
      },
      model: {
        deep: true,
        handler (val) {
          this.$emit("input", val);
        }
      }
    }
  };
</script>
