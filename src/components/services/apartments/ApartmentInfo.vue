<template lang="pug">
  q-card.q-pa-xl.flex.column.apartment-info
    .row
      q-btn(flat icon="arrow_back" :label="getApartmentInfo.address" @click="onBack()")
    .row.items-center.apartment-info__main
      .col-8
        q-card-section
          q-img(:ratio="16/9" contain :src="getApartmentInfo.plan.imagePath")
      .col-4
        q-card-section
          .row.items-center.justify-between.no-wrap
            .text-body1
              | {{$t("common.rentPrice")}}
            .text-body1
              | {{ getApartmentInfo.price }}
          .row.items-center.justify-between.no-wrap.q-mt-md
            .text-body1
              | {{$t("common.minRent")}}
            .text-body1
              | {{ getApartmentInfo.minRentPeriod }}
          q-separator.q-my-md
          .row.items-center.justify-between.no-wrap
            .text-body1
              | {{$t("common.quantity.area")}}
            .text-body1
              | {{ getApartmentInfo.area }}
          .row.items-center.justify-between.no-wrap.q-mt-md
            .text-body1
              | {{$t("entity.services.living.roomsAmount")}}
            .text-body1
              | {{ getApartmentInfo.rooms }}
          .row.items-center.justify-between.no-wrap.q-mt-md
            .text-body1
              | {{$t("common.quantity.entrance")}}
            .text-body1
              | {{ getApartmentInfo.entrance }}
          .row.items-center.justify-between.no-wrap.q-mt-md
            .text-body1
              | {{$t("common.quantity.floor")}}
            .text-body1
              | {{ getApartmentInfo.floor }}
          .row.items-center.justify-between.no-wrap.q-mt-md
            .text-body1
              | {{$t("common.quantity.ceilingHeight")}}
            .text-body1
              | {{ getApartmentInfo.ceilingHeight }}
          q-separator.q-my-md
          .row.items-center.justify-between.no-wrap
            .text-body1
              | {{$t("entity.services.living.equipment")}}
            .text-body1
              a(role="button" @click="downloadList()").apartment-info__link
                | {{ getApartmentInfo.equipment.fileName }}
          .row.items-center.justify-between.no-wrap.q-mt-md(v-if="!!getApartmentInfo.videos.length")
            .text-body1
              | {{$t("entity.maps.buildings.reviews")}}
            .text-body1
              div(v-for="(video, index) in getApartmentInfo.videos" :key="index").ellipsis
                a(target="_blank" :href="video.path")
                  | {{video.path}}
          ImageSlider(:value="getImages" :slides-to-show="4").q-mt-md
    q-card-actions(align="right")
      q-btn(color="primary" :label="$t('action.rent')" @click="onRent()").q-px-xl.q-py-sm
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import { DOWNLOAD_FILE } from "@/store/constants/action-constants";
  import ImageSlider from "components/common/ImageSlider";

  export default {
    name: "ApartmentInfo",
    components: { ImageSlider },
    computed: {
      ...mapGetters("services/apartments", ["getApartmentInfo"]),
      getImages () {
        return this.getApartmentInfo.images.map((i) => i.imagePath);
      }
    },
    methods: {
      ...mapActions([DOWNLOAD_FILE]),
      onBack () {
        this.$emit("back");
      },
      onRent () {
        this.$emit("rent", this.getApartmentInfo.id);
      },
      downloadList () {
        return this.DOWNLOAD_FILE(this.getApartmentInfo.equipment.imagePath);
      }
    }
  };
</script>

<style lang="stylus">
  .apartment-info__main {
    flex 1
  }

  .apartment-info__link {
    text-decoration underline
  }
</style>
