<template lang="pug">
  BaseModal(
    :value="value"
    position="standard"
    @input="closeModal"
  )
    q-card.modal-container
      q-card-section
        q-virtual-scroll(
          :items="data"
          :style="{ maxHeight: '600px' }"
        ).overflow-hidden
          template(v-slot="{ item, index }")
            q-item.q-px-none
              q-item-section
                q-item-label.text-primary
                  | {{ item.author.name.first }}
                q-item-label.text-wrap.break-word
                  | {{ item.text }}
                q-item-label(caption)
                  .row
                    span {{ moment(item.created).format("DD.MM.YYYY") }}
                    template(v-if="item.likes")
                      span.q-mx-sm |
                      q-icon(name="favorite" size="11px").q-mr-xs
                      span {{ item.likes.amount }}
          //q-item(clickable v-for="(item, index) in tableData" :key="index" @click="selectFeature(item.id)").q-px-none
          //  q-item-section
          //    q-item-label(style="max-width: 250px").ellipsis
          //      | {{ item.title }}
          //    q-item-label(caption)
          //      .row
          //        span {{ moment(item.created).format("DD.MM.YYYY") }}
          //        template(v-if="item.likes")
          //          span.q-mx-sm |
          //          q-icon(name="favorite" size="11px").q-mr-xs
          //          span {{ item.likes.amount }}
          //q-inner-loading(:showing="isLoading" color="primary")
      q-card-actions.q-px-md
        BaseInput(
          v-model="message"
          type="textarea"
          label="Сообщение"
          counter
          autogrow
          :key="message"
          :maxlength="200"
          :rules="rules"
        ).col.q-mr-md
        q-btn(icon="send" color="primary" flat @click="createComment")
</template>

<script>
  import BaseModal from "../../common/BaseModal";
  import BaseInput from "../../common/BaseInput";
  import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
  import { CREATE_COMMENT, GET_DATA } from "../../../store/constants/action-constants";
  import { UPDATE_PAGINATION } from "../../../store/constants/mutation-constants";
  import { mapFields } from "../../../plugins/mapFields";
  import moment from "moment";

  export default {
    name: "IdeaCommentsModal",
    components: { BaseModal, BaseInput },
    props: {
      value: {
        type: Boolean,
        default: true
      }
    },
    async created () {
      await this.getData();
    },
    data () {
      return {
        message: null,
        rules: [
          val => !new RegExp(/[<>"'%;()&*+]/g).test(val) || this.$t("common.error.validation.invalid")
        ]
      };
    },
    computed: {
      ...mapState("services/ideas", {
        current: state => state.current
      }),

      ...mapState("services/ideas/comments", {
        data: state => state.data
      }),

      ...mapGetters(["getUserId"]),

      ...mapFields("services/ideas/comments", {
        fields: ["limit", "offset"],
        base: "pagination",
        mutation: UPDATE_PAGINATION
      }),

      isLoading () {
        return this.isLoading || this.$store.state.wait[`services/ideas/comments/${ GET_DATA }`] ||
          this.$store.state.wait[`services/ideas/comments/${ CREATE_COMMENT }`];
      }
    },
    methods: {
      moment,

      ...mapActions("services/ideas/comments", [
        GET_DATA,
        CREATE_COMMENT
      ]),

      ...mapMutations("services/ideas/comments", [
        UPDATE_PAGINATION
      ]),

      closeModal (value) {
        this.$emit("input", value);
      },

      async createComment () {
        await this.CREATE_COMMENT({ id: this.current.id, payload: this.message });
        await this.getData();
        this.message = null;
      },

      async getData () {
        await this.GET_DATA({ id: this.current.id });
      }
    }
  };
</script>

<style scoped>

</style>
