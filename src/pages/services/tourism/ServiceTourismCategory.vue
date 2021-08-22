<template lang="pug">
  div
</template>
<script>
  import { SET_GEODATA } from "../../../store/constants/mutation-constants";

  export default {
    name: "ServiceTourismCategory",
    preFetch ({ store, currentRoute, redirect }) {
      const categoryId = parseInt(currentRoute.params.category, 10);
      const category = store.getters["services/tourism/getServiceMenu"].subSections.find(x => x.id === categoryId);

      if (!category) {
        return redirect("/404");
      }

      store.commit(`services/${ SET_GEODATA }`, null);

      if (category.layers.length === 1 && currentRoute.name === "services-tourism-category") {
        return redirect({
          name: "services-tourism-layer",
          params: { category: categoryId, layer: category.layers[0].id }
        });
      }
    }
  };
</script>
