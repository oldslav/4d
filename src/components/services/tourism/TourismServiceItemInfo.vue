<template lang="pug">
  div.q-px-md.q-py-md
    image-slider(
      :value="getImages"
      :slides-to-show="3"
    )
</template>
<script>
  import ImageSlider from "../../common/ImageSlider";

  export default {
    name: "TourismServiceItemInfo",
    components: { ImageSlider },
    computed:{
      getImages (){
        return [
          "http://placekitten.com/200/300",
          "http://placekitten.com/200/300",
          "http://placekitten.com/200/300",
          "http://placekitten.com/200/300"
        ];
      }
    }
  };
</script>
