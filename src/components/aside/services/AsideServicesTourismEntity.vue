<template lang="pug">
  div.column.full-height
    div.col.overflow-auto
        q-list
          q-item.q-py-lg.text-subtitle(
            :to="getPreviewRoute"
            clickable
          )
            q-item-section.list-item-avatar(avatar)
              q-icon.text-primary(name="arrow_back")
            q-item-section(avatar)
              | {{ getEntity.name }}
        q-separator

        div.q-px-md.q-py-md
          div.q-mb-lg(v-if="getImages.length")
            image-slider(:value="getImages" :slides-to-show="4")

          div(v-show="getEntity.description")
            div.text-caption.text-grey-8 Описание
            div.text-body2.rich-text.break-spaces {{ getEntity.description }}

          q-separator.q-mt-lg.q-mb-lg(v-if="getEntity.workTime || getEntity.link")

          div.row.q-mt-md(v-if="getEntity.workTime || getEntity.link")
            div.col-md-6(v-if="getEntity.workTime")
              div.text-caption.text-grey-8 Часы работы
              div.text-body2.rich-text.break-spaces {{ getEntity.workTime }}

            div.col-md-6(v-if="visibleLink")
              div.text-caption.text-grey-8 Ссылка на сайт
              div.text-body2.rich-text.break-spaces
                a(:href="getEntity.link" target="_blank").text-blue {{ visibleLink }}

          div.row.q-mt-md(v-if="getEntity.length || getEntity.time")
            div.col-md-6(v-if="getEntity.length")
              div.text-caption.text-grey-8 Расстояние
              div.text-body2.rich-text.break-spaces {{ getEntity.length | distance }}

            div.col-md-6(v-if="getEntity.duration")
              div.text-caption.text-grey-8 Время в пути
              div.text-body2.rich-text.break-spaces {{ getEntity.duration }}

          div.row.q-mt-md(v-if="canDisplayDownloadRoute")
            div.col-md-6
              div.text-caption.text-grey-8 Тип маршрута
              div.text-body2.rich-text.break-spaces {{ getEntity.category.name }}

          q-separator.q-mt-lg.q-mb-lg

          div(v-if="getRoutes.length > 0")
            div.text-caption.text-grey-8.q-mb-md Маршруты до {{ getEntity.name }}

            div.row.q-mb-lg(v-for="category in getRoutes")
              div.col-md-6
                div.text-body2 {{ category.name }}

              div.col-md-6.flex.justify-end
                div.text-body2.rich-text.break-spaces.q-mb-sm(v-for="route in category.routes")
                  router-link.link(:to="{ name: 'services-tourism-layer', params: { layer: route.id, category: category.id } }")
                    | {{ route.name }}
                    q-icon(name="arrow_forward_ios")


    div.q-px-md.q-py-md.bg-white(v-show="canDisplayDownloadRoute")
      q-btn.full-width(
        @click="onClickDownloadRoute"
        label="Скачать маршрут"
        color="primary"
        unelevated
        outline
      )
</template>
<script>
  import { mapGetters } from "vuex";
  import url from "url";
  import moment from "moment";
  import ImageSlider from "../../common/ImageSlider";
  import { TourismGeoJSONEntities } from "../../../store/types/tourism";

  export default {
    name: "AsideServicesTourismEntity",
    components: { ImageSlider },
    filters: {
      distance: function (value) {
        if (value < 1000) {
          return `${ value } м`;
        }

        const km = value / 1000;
        const fixed = km.toFixed(1);

        const returnValue = km === parseInt(fixed, 10) ? km : fixed.replace(".",",");
        return `${ returnValue } км`;
      },
      duration (value){
        return moment.duration(value, "minutes").humanize(false);
      }
    },
    computed: {
      ...mapGetters("services/tourism", ["getEntity", "getServiceMenu", "getLayersGeoJSON"]),
      getPreviewRoute () {
        const categoryId = parseInt(this.$route.params.category, 10);
        const layerId = parseInt(this.$route.params.layer, 10);
        const category = this.getServiceMenu.subSections.find(x => x.id === categoryId);
        const layer = category.layers.find(x => x.id === layerId);
        const features = this.getLayersGeoJSON[layer.path].features.filter(x => x.properties.type !== TourismGeoJSONEntities.stop);

        const { layers } = category;

        if (features.length > 1) {
          return { name: "services-tourism-layer", params: { category: categoryId, layer: layerId } };
        }

        if (layers.length === 1) {
          return { name: "services-tourism" };
        }

        return { name: "services-tourism-category", params: { category: categoryId } };
      },

      getImages (){
        return this.getEntity.images.map(x => x.imagePath);
      },
      canDisplayDownloadRoute (){
        return this.getEntity.tcx || this.getEntity.gpx;
      },
      visibleLink (){
        try {
          return url.parse(this.getEntity.link).host;
        } catch (e) {
          return "";
        }
      },
      getRoutes (){
        const groups = (this.getEntity.routes || []).reduce((res, route) => {
          const category = route.category;

          if (!res[category.id]) {
            res[category.id] = { ...category, routes: [] };
          }

          res[category.id].routes.push(route);
          return res;
        }, {});

        return Object.values(groups);
      }
    },
    methods:{
      onClickDownloadRoute (){
        this.$q.dialog({
          title: "Скачать маршрут",
          message: "Выберите нужный формат файла",
          options: {
            type: "radio",
            model: this.getEntity.gpx,
            items: [
              { label: "GPX", value: this.getEntity.gpx },
              { label: "TCP", value: this.getEntity.tcx }
            ]
          },
          cancel: true
        }).onOk(url => window.open(url));
      }
    }
  };
</script>
