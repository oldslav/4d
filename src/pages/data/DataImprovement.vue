<template lang="pug">
	.data-environment.fit
		BtnBack

		.q-mx-md-md.q-my-md
			DataMainSection
				template(#left)
					| test1
				template(#right)
					| test2

		.q-mx-sm
			DataCarousel(
				:list="cards"
			)
</template>

<script>
  import DataCarousel from "@/components/data/DataCarousel.vue";
  import DataMainSection from "@/components/data/DataMainSection.vue";
  import BtnBack from "@/components/data/BtnBack.vue";

  export default {
    name: "DataImprovement",
    components: {
      DataCarousel,
      DataMainSection,
      BtnBack
    },
    computed: {
      cards () {
        return [
          {
            name: this.$t("entity.data.improvement.recreational"),
            icon: "improvement/recreational.svg",
            data: "test",
            leftSectionName: this.$t("entity.data.improvement.parks"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.improvement.squares"),
            rightSectionData: "data"
          },
          {
            name: this.$t("entity.data.improvement.plantTypes"),
            icon: "improvement/plant.svg",
            data: "test",
            leftSectionName: this.$t("entity.data.improvement.tree"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.improvement.bush"),
            rightSectionData: "data"
          },
          {
            name: this.$t("entity.data.improvement.plantedPlant"),
            icon: "improvement/plant.svg",
            data: "test",
            leftSectionName: this.$t("entity.data.improvement.tree"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.improvement.bush"),
            rightSectionData: "data"
          },
          {
            name: this.$t("entity.data.improvement.squareLawn"),
            icon: "improvement/recreational.svg",
            data: "test",
            leftSectionName: this.$t("entity.data.improvement.inResidential"),
            leftSectionData: "data",
            rightSectionName: this.$t("entity.data.improvement.inPublic"),
            rightSectionData: "data"
          }
        ];
      }
    }
  };
</script>

