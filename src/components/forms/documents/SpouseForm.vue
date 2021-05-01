<template lang="pug">
  q-form
    .row.q-col-gutter-sm
      .col-12.col-md-4
        q-input(:label="$t('user.lastName')" v-model="lastName")
      .col-12.col-md-4
        q-input(:label="$t('user.firstName')" v-model="firstName" :rules="nameRules")
      .col-12.col-md-4
        q-input(:label="$t('user.patronymic')" v-model="patronymic")
    q-expansion-item.q-mt-sm.full-width(:label="$t('entity.documents')" header-class="q-px-none text-subtitle")
      file-picker(:max-files="5" :label="this.$t(`user.profile.documents.passportCopy`)" v-model="passport")
      file-picker(:label="this.$t(`user.profile.documents.snilsCopy`)" v-model="snils")
      file-picker(:label="this.$t(`user.profile.documents.innCopy`)" v-model="inn")
      file-picker(:label="this.$t(`user.profile.documents.marriageCertificate`)" v-model="marriageCertificate")
</template>

<script>
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "SpouseForm",
    components: { FilePicker },
    data () {
      return {
        nameRules: [
          val => !!val || "Поле обязательно к заполнению"
        ]
      };
    },
    computed: {
      firstName: {
        get () {
          return null;
        },
        set () {
        }
      },
      lastName: {
        get () {
          return null;
        },
        set () {
        }
      },
      patronymic: {
        get () {
          return null;
        },
        set () {
        }
      },
      passport: {
        get () {
          return null;
        },
        set () {
        }
      },
      snils: {
        get () {
          return null;
        },
        set () {
        }
      },
      inn: {
        get () {
          return null;
        },
        set () {
        }
      },
      marriageCertificate: {
        get () {
          return null;
        },
        set () {
        }
      }
    }
  };
</script>
