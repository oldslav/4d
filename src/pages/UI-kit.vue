<template lang="pug">
  q-page
    Buttons.ui__block
    TextFields.ui__block
    Colors.ui__block
    Typography.ui__block
</template>

<script>
  import { defineComponent } from "@vue/composition-api";
  import Colors from "components/UIKit/Colors.vue";
  import Typography from "components/UIKit/Typography.vue";
  import TextFields from "components/UIKit/TextFields.vue";
  import Buttons from "components/UIKit/Buttons.vue";

  export default defineComponent({
    name: "UIKitPage",
    components: {
      Colors,
      Typography,
      TextFields,
      Buttons
    }
  });
</script>

<style lang="stylus">
.ui__block
  padding 15px

.ui__title
  margin 20px 0
  text-align center
  color $illustration-white
</style>
