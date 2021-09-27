<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="closeModal"
  )
    q-card.modal-container__wide
      q-card-section
        .map-wrapper
          ParkingPlacesScheme.svg-map(
            sprite-name="ParkingMaps"
            ref="map"
            :icon-id="'ParkingMap' + buildingId"
          )
      //q-card-section
      //  q-select(
      //    v-model="parkingPlace"
      //    :options="parkingPlaces"
      //    :label="$t('action.select.parking.lot')"
      //    @input="onParkingPlaceChange"
      //    outlined
      //    autocomplete
      //  )
</template>

<script>
  import ParkingPlacesScheme from "../../../assets/svg/ParkingPlacesScheme";
  import BaseModal from "../../common/BaseModal";
  import BaseSelect from "../../common/BaseSelect";
  import { mapActions } from "vuex";
  import { GET_PARKING_PLACES } from "../../../store/constants/action-constants";

  export default {
    name: "ParkingPlaceModal",
    components: { BaseSelect, ParkingPlacesScheme, BaseModal },
    props: {
      value: {
        type: Boolean,
        required: true
      },
      buildingId: {
        type: [Number, String],
        default: null
      },
      parkingPlaces: {
        type: Array,
        required: true
      }
    },
    async mounted () {
      await this.GET_PARKING_PLACES(this.buildingId);
    },
    data () {
      return {
        parkingPlace: null
      };
    },
    methods: {
      ...mapActions("services/parking", [
        GET_PARKING_PLACES
      ]),

      closeModal (value) {
        this.$emit("input", value);
        Object.assign(this.$data, this.$options.data.call(this));
      },

      onParkingPlaceChange (value) {
        this.$emit("update", value);
      },

      parseParkingPlaces (data) {
        for (let i = 0; i < data.length; i++) {
          this.setNumber(data[i].number);
          if (data[i].status.name === "free") {
            if (this.$refs.map) {
              this.$refs.map.$el.querySelector("#Place" + data[i].number).addEventListener("click", () => {
                this.onParkingPlaceChange(data[i].id);
              });
            }
            this.setColor(data[i].number, "#C1E4CA");
          } else {
            this.setColor(data[i].number, "#FFB6B6");
          }
        }
      },

      setNumber (number) {
        if (this.$refs.map && this.$refs.map.$el.querySelector("#Place" + number)) {
          let mapWidth = Number(this.$refs.map.$el.querySelector("svg").getAttribute("width"));
          if (mapWidth < 2000) { mapWidth = 2000; }
          const maxMapWidth = 4458;
          // const minMapWidth = 1278
          const zoom = maxMapWidth / mapWidth * 1.2;
          const node = this.$refs.map.$el.querySelector("#Place" + number);
          const fontSize = String(50 / zoom); // 20
          const fontFamily = "LetoSans, sans-serif";
          const marginTop = 60 / zoom; // 25

          const marginLeft = 5 * zoom; // 15
          const fill = "rgba(33, 33, 33, 0.6)";
          const width = "20";
          const height = "20";
          const numberNode = document.createElementNS("http://www.w3.org/2000/svg", "text");

          numberNode.setAttribute("x", String(Number(node.getAttribute("x")) + marginLeft));
          numberNode.setAttribute("y", String(Number(node.getAttribute("y")) + marginTop));
          if (node.getAttribute("transform")) {
            if (node.getAttribute("transform").includes("-90")) {
              numberNode.setAttribute("y", String(Number(numberNode.getAttribute("y")) - Number(node.getAttribute("width"))));
            } else { numberNode.setAttribute("x", String(Number(numberNode.getAttribute("x")) - Number(node.getAttribute("height")))); }
          }
          numberNode.setAttribute("width", width);
          numberNode.setAttribute("height", height);

          numberNode.style.fill = fill;
          numberNode.style.fontSize = fontSize;
          numberNode.style.fontFamily = fontFamily;
          numberNode.innerHTML = number;
          node.parentNode.appendChild(numberNode);
        }
      },

      setColor (number, color) {
        if (this.$refs.map && this.$refs.map.$el.querySelector("#Place" + number)) {
          this.$refs.map.$el.querySelector("#Place" + number).style.fill = color;
        }
      }
    },
    watch: {
      parkingPlaces: {
        immediate: true,
        handler (v) {
          this.parseParkingPlaces(v);
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
.map-wrapper
  position: relative
  height: 100%

  .svg-map
    max-width: 100%
    max-height: 100%
    box-shadow: 0 3px 4px rgba(40, 47, 60, 0.05), 0 20px 25px rgba(40, 47, 60, 0.05), 0 0 25px rgba(40, 47, 60, 0.05)
</style>
