<template lang="pug">
  div.date-rangepicker
    q-field(outlined dense :placeholder="placeholder" @click.native="$refs.rangePicker.show()")
      template(v-slot:control) {{ getVisibleRangeDate  }}
      template(v-slot:append)
        q-icon.cursor-pointer(name='event')
          q-popup-proxy(ref='rangePicker' transition-show='scale' transition-hide='scale')
            q-date(v-model='currentValue' @input="onInput()" range)
              .row.items-center.justify-end
                q-btn(v-close-popup @click="onClickClear" :label="$t('action.clear')" color='primary' flat)
                q-btn(v-close-popup :label="$t('action.close')" color='primary' flat)
</template>
<script>
  import moment from "moment";

  export default {
    props: {
      value: {
        type: Object,
        default: () => ({ from: null, to: null })
      },
      autoClose: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: ""
      }
    },
    data (){
      return {
        currentValue: {}
      };
    },
    computed: {
      getVisibleRangeDate () {
        const { from, to } = this.currentValue;

        if (!from && !to) {
          return "";
        }

        if (!to) {
          return `${ moment(from).format("DD MMM YYYY") } - ...`;
        }

        const fromDate = moment(from);
        const toDate = moment(to);

        if (from === to) {
          return toDate.format("DD MMM YYYY");
        }

        const formattedFrom = fromDate.year() !== toDate.year()
          ? fromDate.format("DD MMM YYYY")
          : fromDate.format("DD MMM");

        return `${ formattedFrom } - ${ toDate.format("DD MMM YYYY") }`;
      }
    },
    methods:{
      onInput (){
        const value = this.currentValue;

        if (this.autoClose) {
          this.$refs.rangePicker.hide();
        }

        if (value === null) {
          this.$emit("input", { from: null, to: null });
        } else if (typeof value === "string") {
          const value = moment(value).format("YYYY-MM-DD");
          this.$emit("input", { from: value, to: value });
        } else {
          this.$emit("input", {
            from: moment(value.from).format("YYYY-MM-DD"),
            to: moment(value.to).format("YYYY-MM-DD")
          });
        }
      },

      onClickClear (){
        this.currentValue = null;
        this.onInput();
      }
    },
    watch:{
      value:{
        deep:true,
        immediate: true,
        handler (val){
          this.currentValue = {
            from : val.from ? moment(val.from).format("YYYY/MM/DD") : null,
            to : val.to ? moment(val.to).format("YYYY/MM/DD") : null
          };
        }
      }
    }
  };
</script>
