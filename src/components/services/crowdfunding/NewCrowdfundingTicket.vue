<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="toggleModal()"
  )
    q-card.modal-container
      q-stepper(
        keep-alive
        ref="stepper"
        v-model="step"
        color="primary"
        alternative-labels
        flat
        animated
      )
        q-step(
          title="Основная информация"
          :done="step > 1"
          :name="1"
          icon="edit"
        )
          q-input.q-mb-md(v-model="title" :label="$t('entity.services.crowdfunding.form.title')")
          q-input(v-model="description" outlined type="textarea" :label="$t('entity.services.crowdfunding.form.description')")
          .text-medium.q-my-sm
            | {{ $t("entity.services.crowdfunding.form.dates.title") }}
            .row.q-mt-sm
              q-input.col-6.q-pr-sm(
                ref="date"
                filled
                v-model="startDate"
                lazy-rules
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
              q-input.col-6.q-pr-sm(
                ref="date"
                filled
                v-model="endDate"
                lazy-rules
                :rules="[ val => val !== null && val !== '' || '']"
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
            BaseSelect.col-6(
              v-model="category"
              :options="categoriesList"
              :label="$t('entity.services.crowdfunding.form.category')"
              outlined
              autocomplete
              :inputDebounce="300"
            )
          .text-medium.q-my-sm
            | {{ $t("entity.services.crowdfunding.form.cover") }}
          .row.items-center
            BaseDragDrop.col-6(
              :value="cover"
              @input="uploadCover"
            )
            .col-6.q-pl-lg
              q-img(:src="coverImageSrc")
          
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")

        q-step(
          title="Подробное описание проекта"
          :done="step > 2"
          :name="2"
          icon="edit"
        )
          .text-medium.q-mb-sm
            | {{ $t("entity.services.crowdfunding.form.markdownDescription") }}
          q-editor(v-model="markdownContent" min-height="10rem")

          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')") 
            q-btn(@click="step++" color="primary" :label="$t('action.continue')")

        q-step(
          title="Фотографии и видео"
          :name="3"
          icon="edit"
        )
          .text-medium.q-my-md
            | {{ $t("entity.services.crowdfunding.form.media") }}
            | {{ $t("entity.services.crowdfunding.form.mediaMaxSize") }}
          BaseDragDrop(
            :value="media"
            max-files="3"
            @input="uploadMedia"
          )
          .text-medium.q-my-md
            | {{ $t("entity.services.crowdfunding.form.loadedMedia") }}
          .row
            q-img.col-3.q-ml-sm(
              v-for="(preview, index) in mediaPreviews"
              :key="index"
              :src="preview"
            )
        
          q-stepper-navigation.q-gutter-md
            q-btn(@click="step--" color="red" :label="$t('action.back')")
            q-btn(@click="onSubmit()" color="primary" :label="$t('action.submit')")
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
      value: {
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
      }
    }
  };
</script>
