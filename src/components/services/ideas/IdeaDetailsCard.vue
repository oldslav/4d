<template lang="pug">
  q-card(v-if="current").bg-white.modal-container__dense.full-width
    q-card-section
      h6.q-my-auto {{ current.title }}
        span.float-right
      q-separator.q-my-sm
    div(v-if="current.images.length").q-px-sm
      ImageSlider(:value="current.images.map(v => v.imagePath)" :slides-to-show="4")
    q-card-section.row
      div.column.col-6
        span.text-grey-6 Заявитель
        span.q-my-auto {{ current.author.name.full }}
      div.column.col-6
        span.text-grey-6 Тип заявки
        span.q-my-auto {{ current.type.description }}
    q-card-section
      div.column.col-12
        span.text-grey-6 Детали
        span.q-my-auto {{ current.description }}
    q-card-section
      div.column.col-12
        span.text-grey-6 Статус
        span.q-my-auto {{ current.status.description }}
        BaseStatus(:value="Number(current.status.id)")
    q-card-section
      div(v-if="current.status.id === 6")
        span.text-grey-6 Голосование
        .column.items-start
          q-item.q-px-none.full-width
            q-item-section.items-start.text-green-4
              q-btn(:disable="Boolean(current.votes.votedOptionId)" icon="o_thumb_up" flat label="Нравится идея" padding="xs" @click="vote(1)")
            q-item-section(side).text-green-4
              | {{ getPercentage(current.votes.amount, current.votes.byOption["1"]) }}% ({{ current.votes.byOption["1"] || 0 }})
          q-item.q-px-none.full-width
            q-item-section.items-start.text-red-11
              q-btn(:disable="Boolean(current.votes.votedOptionId)" icon="o_thumb_down" color="red-11" flat label="Не нравится идея" padding="xs" @click="vote(2)")
            q-item-section(side).text-red-11
              | {{ getPercentage(current.votes.amount, current.votes.byOption["2"]) }}% ({{ current.votes.byOption["2"] || 0 }})
          q-item.q-px-none.full-width
            q-item-section.items-start
              q-btn(:disable="Boolean(current.votes.votedOptionId)" icon="sentiment_neutral" flat label="Затрудняюсь с ответом" padding="xs" @click="vote(3)")
            q-item-section(side)
              | {{ getPercentage(current.votes.amount, current.votes.byOption["3"]) }}% ({{ current.votes.byOption["3"] || 0 }})
    q-card-actions.row
      q-btn(v-if="current.likes.isLiked" color="pink-12" icon="favorite" flat :label="current.likes.amount" @click="likeIdea" dense padding="xs")
      q-btn(v-else icon="favorite_border" flat :label="current.likes.amount " @click="likeIdea" dense padding="xs")
      q-btn(icon="o_chat" flat :label="current.commentsCount" dense padding="xs" disable)
    q-inner-loading(:showing="isLoading")
</template>

<script>
  import BaseStatus from "../../common/BaseStatus";
  import { mapActions, mapState } from "vuex";
  import { GET_CURRENT, GET_REFERENCES, UPDATE_LIKE, UPDATE_VOTE } from "../../../store/constants/action-constants";
  import ImageSlider from "../../common/ImageSlider";

  export default {
    name: "IdeaDetailsCard",
    components: { ImageSlider, BaseStatus },
    props: {
      id: {
        type: [String, Number],
        required: true,
        default: null
      }
    },
    created () {
      if (!this.references) {
        this.GET_REFERENCES();
      }
    },
    computed: {
      ...mapState("services/ideas", {
        current: state => state.current,
        references: state => state.references
      }),

      isLoading () {
        return this.$store.state.wait[`services/ideas/${ GET_CURRENT }`] || this.$store.state.wait[`services/ideas/${ UPDATE_LIKE }`];
      }
    },
    methods: {
      ...mapActions("services/ideas", [
        GET_CURRENT,
        UPDATE_LIKE,
        UPDATE_VOTE,
        GET_REFERENCES
      ]),

      getPercentage (total, partial) {
        return (100 * partial / total) || 0;
      },

      async likeIdea () {
        await this.UPDATE_LIKE(this.id);
        await this.GET_CURRENT(this.id);
      },

      vote (answerId) {
        this.UPDATE_VOTE({ id: this.id, answerId });
        this.GET_CURRENT(this.id);
      }
    },
    watch: {
      id: {
        immediate: true,
        handler () {
          this.GET_CURRENT(this.id);
        }
      }
    }
  };
</script>

<style scoped>

</style>
