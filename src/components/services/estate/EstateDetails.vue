<template>
  <q-page class="q-pa-lg bg-white">
    <template v-if="current">
      <span class="text-medium-b">
        <q-icon class="text-primary cursor-pointer" name="arrow_back" size="md" @click="$router.back()"></q-icon>
        {{ `${ current.address.street } ${ current.address.house || "" }` }}
      </span>

      <div class="row q-gutter-lg q-mt-none">
        <q-card class="col-12 col-md-8 q-pa-lg">
          <div class="row height__2">
            <h6 class="col text-medium-b q-my-auto">
              {{ $t("common.info") }}
            </h6>
            <q-btn
              color="primary"
              :label="$t('action.edit')"
              flat
              dense
              @click="isEditModal = !isEditModal"></q-btn>
          </div>
          <q-separator class="q-my-md"></q-separator>
          <div class="row q-col-gutter-md">
            <div :key="i" v-for="({ label, value }, i) in infoFields" class="row col-12 col-md-6">
              <span class="col-6">{{ label }}</span>
              <span class="col text-grey">{{ value }}</span>
            </div>
          </div>
        </q-card>
        <q-card class="col-12 col-md q-pa-lg">
          <div class="row height__2">
            <h6 class="col text-medium-b q-my-auto">
              {{ $t("common.documents") }}
            </h6>
            <q-btn color="primary" icon="add" disable flat @click="isDocumentsModal = !isDocumentsModal">
            </q-btn>
          </div>
          <q-separator class="q-my-md"></q-separator>
          <q-list v-if="current.documents.length">
            <q-expansion-item
              :key="key"
              v-for="(value, key) in computedDocuments">
              <template #header>
                <q-item dense class="col is-paddingless">
                  <q-item-section side>
                    <q-img :src="documentsExtensions[key]" width="24px"></q-img>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-capitalize">
                      {{ key + ` (${ value.length })` }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <q-item :key="i" v-for="(file, i) in value" dense clickable>
                <q-item-section class="col ellipsis" avatar @click="fileDownload(file.imagePath)">
                  {{ file.fileName }}
                </q-item-section>
                <q-item-section side class="is-paddingless">
                  <q-btn flat color="primary" icon="o_delete" @click="documentDelete(file.id)"></q-btn>
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
          <h6 v-else class="text-center">
            {{ $t("common.noData") }}
          </h6>
        </q-card>
        <q-card class="col-12 col-md-8 q-pa-lg">
          <div class="row height__2">
            <h6 class="col text-medium-b q-my-auto">
              {{ $t("common.photos") }}
            </h6>
            <q-btn color="primary" icon="add" disable flat @click="isImagesModal = !isImagesModal">
            </q-btn>
          </div>
          <q-separator class="q-my-md"></q-separator>
          <q-carousel
            v-if="current.images.length"
            v-model="slide"
            :fullscreen="fullscreen"
            keep-alive
            animated
            :keep-alive-max="10"
            swipeable
            thumbnails>
            <q-carousel-slide
              :key="i"
              v-for="({ imagePath }, i) in current.images"
              :img-src="getImage(imagePath)"
              :name="i"
              class="cursor-pointer"
              @click="fullscreen = !fullscreen">
            </q-carousel-slide>
            <template v-slot:control>
              <q-carousel-control
                position="top-right"
                :offset="[18, 18]">
                <q-fab v-show="!fullscreen" color="white" text-color="primary" icon="o_more_vert" direction="left" padding="sm">
                  <q-fab-action push round dense color="white" text-color="primary"
                                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                                @click="fullscreen = !fullscreen">
                  </q-fab-action>
                  <q-fab-action push round dense color="white" text-color="red"
                                icon="delete_outline"
                                @click="imageDelete()">
                  </q-fab-action>
                </q-fab>
                <q-fab-action v-show="fullscreen" push round dense color="white" text-color="primary"
                              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                              @click="fullscreen = !fullscreen">
                </q-fab-action>
              </q-carousel-control>
            </template>
          </q-carousel>
          <h6 v-else class="text-center">
            {{ $t("common.noData") }}
          </h6>
        </q-card>
      </div>
    </template>

    <q-inner-loading :showing="!current || isLoading"></q-inner-loading>

    <BaseModal v-model="isImagesModal" position="standard">
      <q-card>
        <q-uploader
          :url="imageUploadUrl"
          label="Перетяните или выберите изображения"
          field-name="files"
          multiple
          batch
          :headers="uploadImageHeaders"
          @uploading="isImagesLoading = true"
          @uploaded="imageUploaded">
        </q-uploader>
        <q-inner-loading :showing="isImagesLoading"></q-inner-loading>
      </q-card>
    </BaseModal>

    <BaseModal v-if="isEditModal" v-model="isEditModal" position="standard">
      <q-card class="modal-container__dense">
        <q-card-section>
          <BaseInput v-model.number="form.number" type="number" :label="$t('entity.estate.details.number')"></BaseInput>
          <BaseInput v-model.number="form.floors" type="number" :label="$t('entity.estate.details.floors')"></BaseInput>
          <BaseInput v-model="form.house" :label="$t('entity.estate.details.name')"></BaseInput>
          <BaseInput v-model="form.street" :label="$t('entity.estate.details.street')"></BaseInput>
          <BaseInput v-model.number="form.constructYear" type="number" :label="$t('entity.estate.details.constructYear')"></BaseInput>
          <BaseInput v-model.number="form.area" type="number" :label="$t('entity.estate.details.area')"></BaseInput>
          <BaseInput v-model="form.link" :label="$t('entity.estate.details.link')"></BaseInput>
          <BaseInput v-model.number="form.organizationCount" type="number" :label="$t('entity.estate.details.organizationCount')"></BaseInput>
          <BaseInput v-model.number="form.residentsCount" type="number" :label="$t('entity.estate.details.residentsCount')"></BaseInput>
          <BaseInput v-model.number="form.parkingCount" type="number" :label="$t('entity.estate.details.parkingCount')"></BaseInput>
          <BaseSelect v-model="form.infrastructureType" :options="infrastructureTypes" :label="$t('entity.estate.details.infrastructureType')"></BaseSelect>
          <BaseSelect v-model="form.categoryId" :options="categories" :label="$t('entity.estate.details.category')"></BaseSelect>
          <BaseSelect v-model="form.statusId" :options="statuses" :label="$t('entity.estate.details.status')"></BaseSelect>
          <BaseSelect v-model="form.builderId" :options="companies" :label="$t('entity.estate.details.builder')"></BaseSelect>
          <BaseSelect v-model="form.managementCompanyId" :options="companies" :label="$t('entity.estate.details.managingCompany')"></BaseSelect>
        </q-card-section>
        <q-card-section class="text-right">
          <q-btn :label="$t('action.save')" color="primary" @click="editDetails"></q-btn>
        </q-card-section>
      </q-card>
    </BaseModal>

    <BaseModal v-if="isDocumentsModal" v-model="isDocumentsModal" position="standard">
      <q-card class="q-pa-md modal-container__dense">
        <q-uploader
          :url="documentsUploadUrl"
          class="full-width"
          accept=".pdf,.docx,.doc,.xls,.xlsx"
          multiple
          batch
          :headers="uploadImageHeaders"
          field-name="files"
          @uploaded="documentUploaded">
          <template v-slot:header="scope">
            <div class="row justify-between">
              <div class="row">
                <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" round dense flat @click="scope.removeQueuedFiles">
                  <q-tooltip>Clear All</q-tooltip>
                </q-btn>
                <h6 class="text-medium-b q-my-auto">
                  Документы
                </h6>
              </div>
              <div>
                <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                  <q-uploader-add-trigger></q-uploader-add-trigger>
                  <q-tooltip>Pick Files</q-tooltip>
                </q-btn>
                <q-btn v-if="scope.canUpload" icon="cloud_upload" round dense flat @click="scope.upload">
                  <q-tooltip>Upload Files</q-tooltip>
                </q-btn>
                <q-btn v-if="scope.isUploading" icon="clear" round dense flat @click="scope.abort">
                  <q-tooltip>Abort Upload</q-tooltip>
                </q-btn>
              </div>
            </div>
            <q-separator class="q-my-md"></q-separator>
          </template>
        </q-uploader>
      </q-card>
    </BaseModal>
  </q-page>
</template>

<script>
  import { mapActions, mapMutations, mapState } from "vuex";
  import {
    DELETE_DOCUMENT,
    DELETE_IMAGE, DOWNLOAD_FILE,
    GET_DETAILS,
    GET_REFERENCES, UPDATE_DETAILS,
    UPLOAD_IMAGE
  } from "../../../store/constants/action-constants";
  import { SET_DETAILS_EMPTY } from "../../../store/constants/mutation-constants";
  import BaseInput from "../../common/BaseInput";
  import BaseModal from "../../common/BaseModal";
  import BaseSelect from "../../common/BaseSelect";
  import estate from "../../../store/services/estate";
  import MyDocumentsForm from "../../forms/documents/MyDocumentsForm";
  import doc from "src/assets/svg/icons/docs/doc.svg";
  import pdf from "src/assets/svg/icons/docs/pdf.svg";
  import xls from "src/assets/svg/icons/docs/xls.svg";

  export default {
    name: "EstateDetails",
    components: { MyDocumentsForm, BaseSelect, BaseModal, BaseInput },
    props: {
      id: {
        type: [Number, String],
        required: true
      }
    },
    preFetch ({ store, currentRoute }) {
      store.registerModule("estate", estate);
      return Promise.all([
        store.dispatch(`services/estate/${ GET_REFERENCES }`),
        store.dispatch(`services/estate/${ GET_DETAILS }`, currentRoute.params.id)
      ]);
    },
    async created () {
      this.SET_DETAILS_EMPTY();
      await this.GET_DETAILS(this.id);

      const unwatch = this.$watch("current", value => {
        this.form = {
          number: value.address.house,
          floors: value.floors,
          street: value.address.street,
          house: value.house,
          constructYear: value.constructYear,
          area: value.area,
          infrastructureType: value.infrastructureType,
          link: value.link,
          organizationCount: value.organizationCount,
          parkingCount: value.parkingCount,
          residentsCount: value.residentsCount,
          statusId: value.status.id,
          categoryId: value.category.id,
          // managementCompanyId: value.company.id,
          builderId: value.builder.id,
          typeId: value.type.id
        };
      }, { immediate: true });
      unwatch();
    },
    data () {
      return {
        slide: 0,
        fullscreen: false,
        isImagesModal: false,
        isImagesLoading: false,
        isDocumentsModal: false,
        isEditModal: false,
        form: {
          number: null,
          floors: null,
          house: null,
          street: null,
          constructYear: null,
          area: null,
          infrastructureType: null,
          link: null,
          organizationCount: null,
          parkingCount: null,
          residentsCount: null,
          statusId: null,
          categoryId: null,
          managementCompanyId: null,
          builderId: null,
          typeId: null
        }
      };
    },
    computed: {
      ...mapState("services/estate", {
        current: state => state.current,
        categories: state => state.references && state.references.category.map(({ id, name }) => ({
          key: "id",
          value: id,
          label: name
        })),
        infrastructureTypes: state => state.references && state.references.type.map(({ id, description }) => ({
          key: "id",
          value: id,
          label: description
        })),
        statuses: state => state.references && state.references.status.map(({ id, name }) => ({
          key: "id",
          value: id,
          label: name
        })),
        companies: state => state.references && state.references.company.map(({ id, name }) => ({
          key: "id",
          value: id,
          label: name
        }))
      }),

      documentsExtensions () {
        return {
          pdf: pdf,
          doc: doc,
          docx: doc,
          xls: xls,
          xlsx: xls
        };
      },

      computedDocuments () {
        return this.current.documents.reduce((acc, item) => {
          acc[item.extension] ? acc[item.extension].push(item) : acc[item.extension] = [item];
          return acc;
        }, {});
      },

      uploadImageHeaders () {
        return [
          {
            name: "Authorization",
            value: `Bearer ${ this.$q.cookies.get("PHPSESS2ID") }`
          }
        ];
      },

      isLoading () {
        return this.$store.state.wait[`services/estate/${ GET_DETAILS }`] ||
          this.$store.state.wait[`services/estate/${ DELETE_IMAGE }`];
      },

      imageUploadUrl () {
        return process.env.SERVER_API_HOST + `/api/v1/map/buildings/gis/${ this.current && this.current.id }/image`;
      },

      documentsUploadUrl () {
        return process.env.SERVER_API_HOST + `/api/v1/map/buildings/gis/${ this.current && this.current.id }/documents`;
      },

      // isInfoChanged () {
      //   return this.infoFields.map(item => {
      //     return this.formatEmptyString(item.related) !== this.formatEmptyString(item.value);
      //     return {
      //       isChanged: this.formatEmptyString(item.related) !== this.formatEmptyString(item.value),
      //       left: item.related,
      //       right: item.value,
      //       computedLeft: this.formatEmptyString(item.related),
      //       computedRight: this.formatEmptyString(item.value)
      //     };
      //   });
      // }

      infoFields () {
        return this.current && [
          {
            label: this.$t("entity.estate.details.id"),
            value: this.formatEmptyString(this.current.id),
            type: "number",
            disabled: true,
            related: this.current.id
          },
          {
            label: this.$t("entity.estate.details.infrastructureType"),
            value: this.formatEmptyString(this.current.infrastructureType),
            options: this.infrastructureTypes,
            related: this.current.infrastructureType
          },
          {
            label: this.$t("entity.estate.details.number"),
            value: this.formatEmptyString(this.current.address.house),
            type: "number",
            related: this.current.address.house
          },
          {
            label: this.$t("entity.estate.details.category"),
            value: this.formatEmptyString(this.current.category.name),
            options: this.categories,
            related: this.current.category.name
          },
          {
            label: this.$t("entity.estate.details.floors"),
            value: this.formatEmptyString(this.current.floors),
            type: "number",
            related: this.current.floors
          },
          {
            label: this.$t("entity.estate.details.area"),
            value: this.formatEmptyString(this.current.area),
            type: "number",
            related: this.current.area
          },
          {
            label: this.$t("entity.estate.details.name"),
            value: this.formatEmptyString(this.current.house),
            type: "text",
            related: this.current.house
          },
          {
            label: this.$t("entity.estate.details.managingCompany"),
            value: this.formatEmptyString(this.current.managementCompany && this.current.managementCompany.name),
            options: this.companies,
            related: this.current.managementCompany && this.current.managementCompany.name
          },
          {
            label: this.$t("entity.estate.details.street"),
            value: this.formatEmptyString(this.current.street),
            type: "text",
            related: this.current.street
          },
          {
            label: this.$t("entity.estate.details.residentsCount"),
            value: this.formatEmptyString(this.current.residentsCount),
            type: "number",
            related: this.current.residentsCount
          },
          {
            label: this.$t("entity.estate.details.constructYear"),
            value: this.formatEmptyString(this.current.constructYear),
            type: "number",
            related: this.current.constructYear
          },
          {
            label: this.$t("entity.estate.details.status"),
            value: this.formatEmptyString(this.current.status.name),
            options: this.statuses,
            related: this.current.status.name
          },
          {
            label: this.$t("entity.estate.details.parkingCount"),
            value: this.formatEmptyString(this.current.parkingCount),
            type: "number",
            related: this.current.parkingCount
          },
          {
            label: this.$t("entity.estate.details.builder"),
            value: this.formatEmptyString(this.current.builder.name),
            type: "text",
            disabled: true,
            related: this.current.builder.name
          }
        ];
      }
    },
    methods: {
      ...mapActions([
        DOWNLOAD_FILE
      ]),

      ...mapActions("services/estate", {
        GET_DETAILS,
        UPLOAD_IMAGE,
        GET_REFERENCES,
        DELETE_IMAGE,
        UPDATE_DETAILS,
        DELETE_DOCUMENT
      }),

      ...mapMutations("services/estate", [
        SET_DETAILS_EMPTY
      ]),

      async editDetails () {
        await this.UPDATE_DETAILS({ id: this.id, payload: this.form });
        await this.GET_DETAILS(this.id);
        this.isEditModal = false;
        this.$q.notify({
          message: "Информация успешно изменена",
          color: "positive"
        });
      },

      async imageUploaded () {
        await this.GET_DETAILS(this.id);
        this.isImagesLoading = false;
        this.isImagesModal = false;
        this.$q.notify({
          message: "Изображения успешно добавлены",
          color: "positive"
        });
      },

      async documentUploaded () {
        await this.GET_DETAILS(this.id);
        this.isDocumentsModal = false;
        this.$q.notify({
          message: "Документы успешно добавлены",
          color: "positive"
        });
      },

      async imageDelete () {
        await this.DELETE_IMAGE(this.current.images[this.slide].id);
        await this.GET_DETAILS(this.id);
        this.$q.notify({
          message: "Изображение успешно удалено",
          color: "positive"
        });
      },

      async fileDownload (url) {
        await this.DOWNLOAD_FILE(url);
      },

      async documentDelete (id) {
        await this.DELETE_DOCUMENT(id);
        await this.GET_DETAILS(this.id);
        this.$q.notify({
          message: "Файл успешно удалён",
          color: "positive"
        });
      },

      formatEmptyString (str) {
        return str || this.$t("common.noData");
      },

      getImage (url) {
        return process.env.SERVER_API_HOST + url;
      },

      toggleModal (val) {
        this.$emit("input", val);
      }
    }
  };
</script>

<style scoped>

</style>
