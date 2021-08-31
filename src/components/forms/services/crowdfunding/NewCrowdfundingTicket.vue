<template lang="pug">
  q-form.q-pa-md(v-if="isVisible" @submit="onSubmit()" )
    q-input(
      v-model="title"
      :label="$t('entity.services.crowdfunding.form.title')"
      :rules="[ val => val !== null && val !== '' || '']"
    )
    .text-medium.q-my-sm
      | {{ $t("entity.services.crowdfunding.form.dates.title") }}
      .row.q-mt-sm
        q-input.col-6.q-pr-sm(
          ref="date"
          filled
          v-model="startDate"
          :rules="[ val => val !== null && val !== '' || '']"
          @click="$refs.qDateStartProxy.show()"
        )
          template(v-slot:append)
            q-icon(name="event" class="cursor-pointer")
              q-popup-proxy(ref="qDateStartProxy")
                q-date(
                  v-model="startDate"
                  :mask="'YYYY-MM-DD'"
                  @input="$refs.qDateStartProxy.hide()"
                )
        q-input.col-6(
          ref="date"
          filled
          v-model="endDate"
          :rules="validateEndDate"
          @click="$refs.qDateEndProxy.show()"
        )
          template(v-slot:append)
            q-icon(name="event" class="cursor-pointer")
              q-popup-proxy(ref="qDateEndProxy")
                q-date(
                  v-model="endDate"
                  :mask="'YYYY-MM-DD'"
                  @input="$refs.qDateEndProxy.hide()"
                )

    .row
      BaseSelect.col-12(
        v-model="category"
        :options="categoriesList"
        :label="$t('entity.services.crowdfunding.form.category')"
        :rules="[ val => val !== '' || '' ]"
        outlined
        autocomplete
        :inputDebounce="300"
      )

    q-input(
      v-model="description"
      :label="$t('entity.services.crowdfunding.form.description')"
      :rules="[ val => val !== null && val !== '' || '']"
      outlined
      type="textarea"
    )

    .text-medium
      | {{ $t("entity.services.crowdfunding.form.media") }}
    .sub-header.text-small.q-mb-md
      | {{ $t("entity.services.crowdfunding.form.mediaMaxCount") }}
    .hint.text-caption.q-mb-md
      | Формат jpg, jpeg, png, pdf
    BaseDragDrop.q-mb-md(
      :value="media"
      max-files="5"
      @input="uploadMedia"
    )
    .text-medium.q-mb-md(v-if="media.length > 0")
      | {{ $t("entity.services.crowdfunding.form.loadedMedia") }}
    .row.q-mb-md
      q-img.col-3.q-ml-sm(
        v-for="(preview, index) in mediaPreviews"
        :key="index"
        :src="preview"
      )
        q-icon.full-width.row.justify-end.cursor-pointer(
          name="close"
          @click="removeImage(index)"
        )


    .row
      q-btn.col-12(color="primary" :label="$t('action.submit')" type="submit")

    q-inner-loading(:showing="isLoading")
      q-spinner(size="50px" color="primary")
</template>

<script>
  import { mapActions } from "vuex";
  import BaseModal from "components/common/BaseModal";
  import BaseSelect from "components/common/BaseSelect";
  import BaseDragDrop from "components/common/BaseDragDrop";
  import FormContacts from "components/common/form/FormContacts";
  import FilePicker from "components/common/FilePicker";
  import FormName from "components/common/form/FormName";
  import { CREATE_USER_TICKET_CROWDFUNDING } from "@/store/constants/action-constants";

  export default {
    name: "NewCrowdfundingTicket",
    components: { FormName, BaseModal, BaseSelect, BaseDragDrop, FormContacts, FilePicker },
    props: {
      isVisible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        step: 1,
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        category: "",
        categoriesList: [
          {
            value: 1,
            label: "Технологии и дизайн"
          },
          {
            value: 2,
            label: "Спорт"
          },
          {
            value: 3,
            label: "Искусство"
          },
          {
            value: 4,
            label: "Здоровье и экология"
          },
          {
            value: 5,
            label: "Путешествие и туризм"
          },
          {
            value: 6,
            label: "Домашние животные"
          },
          {
            value: 7,
            label: "Развлечения и досуг"
          }
        ],
        markdownContent: "",
        cover: [],
        coverImageSrc: null,
        media: [],
        mediaPreviews: []
      };
    },
    computed: {
      isLoading () {
        return this.$store.state.wait[`user/tickets/crowdfunding/${ CREATE_USER_TICKET_CROWDFUNDING }`];
      },
      validateEndDate () {
        return [
          val => val !== null && val !== "" || "",
          val => Date.parse(val) > Date.parse(this.startDate)
        ];
      }
    },
    methods: {
      ...mapActions("user/tickets/crowdfunding", [CREATE_USER_TICKET_CROWDFUNDING]),
      toggleModal (value) {
        this.$emit("input", value);
      },
      uploadCover (file) {
        this.cover[0] = file;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
          this.coverImageSrc = reader.result;
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      },
      uploadMedia (file) {
        this.media.push(file);

        const reader = new FileReader();
        reader.addEventListener("load", () => {
          this.mediaPreviews.push(reader.result);
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      },
      onSubmit () {
        const { title, description, startDate, endDate, category, markdownContent, cover, media } = this;
        return this.CREATE_USER_TICKET_CROWDFUNDING({ title, description, startDate, endDate, categoryId: category.value, markdownContent, cover: cover[0], media })
          .then(() => {
            this.$emit("success");
          })
          .catch(() => {
            this.$emit("fail");
          })
          .finally(() => {
            this.toggleModal(false);
          });
      },
      removeImage (index) {
        this.media.splice(index, 1);
        this.mediaPreviews.splice(index, 1);
      }
    }
  };
</script>

<style lang="stylus" scoped>
.sub-header
  color: #0E8AFD
  margin-bottom: 4px
.hint
  color: rgba(0,0,0,0.54)
</style>