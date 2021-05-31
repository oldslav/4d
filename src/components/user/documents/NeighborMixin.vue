<script>
  import { mapActions } from "vuex";
  import { isEqual } from "lodash";
  import { CREATE_USER_NEIGHBOR, UPDATE_USER_NEIGHBOR } from "@/store/constants/action-constants";

  const deepClone = (val) => JSON.parse(JSON.stringify(val));

  export default {
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      index: {
        type: Number,
        default: null
      },
      backup: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        neighbor: { ...this.value },
        nameRules: [
          val => !!val || this.$t("common.error.validation.required"),
          val => /^[a-zA-Zа-бА-б-]+$/.test(val) || this.$t("common.error.validation.letters")
        ]
      };
    },
    computed: {
      isChanged () {
        return !isEqual(this.backup, this.neighbor);
      },
      isUpdate () {
        return !!this.neighbor.id;
      }
    },
    methods: {
      ...mapActions("user/neighbors", [CREATE_USER_NEIGHBOR, UPDATE_USER_NEIGHBOR]),
      onSubmit () {
        let action;
        let actionLabel = "create";
        if (this.isUpdate) {
          actionLabel = "update";
          action = this[UPDATE_USER_NEIGHBOR];
        } else {
          action = this[CREATE_USER_NEIGHBOR];
        }
        return action.call(this, this.neighbor)
          .then(() => {
            this.$q.notify({
              type: "positive",
              message: this.$t(`entity.neighbors.messages.${ actionLabel }.success`)
            });
          })
          .catch(() => {
            this.$q.notify({
              type: "negative",
              message: this.$t(`entity.neighbors.messages.${ actionLabel }.fail`)
            });
          });
      },
      onCancel () {
        if (this.isUpdate) {
          this.discardChanges();
        } else {
          this.$emit("remove", this.index);
        }
      },
      discardChanges () {
        this.neighbor = deepClone(this.backup);
      },
      onRemove (id) {
        this.$emit("removeFile", id);
      }
    },
    watch: {
      value: {
        deep: true,
        handler (val) {
          this.neighbor = val;
        }
      },
      neighbor: {
        deep: true,
        handler (val) {
          this.$emit("input", val);
        }
      }
    }
  };
</script>
