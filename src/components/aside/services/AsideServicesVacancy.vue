<template lang="pug">
  q-list
    q-item.q-py-lg.text-subtitle(clickable to="/services")
      q-item-section.list-item-avatar(avatar)
        q-icon.text-primary(name="arrow_back")
      q-item-section(avatar)
        | {{ $t("action.back") }}
    q-separator

    q-item.q-py-md.text-subtitle(
      v-for="(item, index) in getProfIndustry"
      :key="item.id"
      :active="item.id === activeIndustryId"
      clickable
      active-class="list-item-active"
      @click="onClickIndustry(item.id)"
    )
      q-item-section.list-item-avatar(avatar)
        q-icon(:name="item.icon")
      q-item-section
        | {{ item.label }}
</template>

<script>
  import { mapGetters } from "vuex";
  import { GET_VACANCY_REFERENCES } from "../../../store/constants/action-constants";
  import { VacancyReferencesEnum } from "../../../store/types/vacancy";

  const ICONS_HOST = process.env.BROWSER_API_HOST;

  export default {
    name: "AsideServicesVacancy",
    components: {},
    preFetch ({ store }){
      return store.dispatch(`services/vacancy/${ GET_VACANCY_REFERENCES }`);
    },

    computed:{
      ...mapGetters("services/vacancy", ["getVacancyReferences"]),
      getProfIndustry (){
        const options = this.getVacancyReferences[VacancyReferencesEnum.profIndustry].map(
          x => ({ id: x.id, label: x.description, icon: `img:${ ICONS_HOST }${ x.icon }` })
        );

        return [
          { id: "", label: "Все" },
          ...options
        ];
      },

      activeIndustryId (){
        const industryId = this.$route.query.industry || "";
        const industry = this.getProfIndustry.find(x => x.id === industryId);

        return industry ? industry.id : "";
      }
    },
    methods: {
      onClickIndustry (industryId) {
        this.$router.push({
          query: { industry: industryId || undefined }
        });
      }
    }
  };
</script>
