<template lang="pug">
  q-form
    .row.q-col-gutter-sm
      .col-12.col-md-4
        q-input(:label="$t('user.lastName')" v-model="lastName")
      .col-12.col-md-4
        q-input(:label="$t('user.firstName')" v-model="firstName")
      .col-12.col-md-4
        q-input(:label="$t('user.patronymic')" v-model="patronymic")
    q-expansion-item.q-mt-sm.full-width(:label="$t('entity.documents')" header-class="q-px-none text-subtitle")
      file-picker(:label="this.$t('user.profile.documents.birthCertificate')" v-model="birthCertificate")
      file-picker(:label="this.$t('user.profile.documents.registrationCopy')" v-model="registration")
      file-picker(:label="this.$t('user.profile.documents.passportCopy')" :max-files="5" v-model="passport")
</template>

<script>
  import FilePicker from "components/common/FilePicker";

  export default {
    name: "ChildForm",
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
      registration: {
        get () {
          return null;
        },
        set () {
        }
      },
      birthCertificate: {
        get () {
          return null;
        },
        set () {
        }
      }
    }
  };
</script>
