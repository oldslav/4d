<template lang="pug">
  div(class="q-mx-xl")
    Buttons
    TextFields
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

</style>
