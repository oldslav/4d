<script>
  import { mapActions } from "vuex";
  import { isEqual, cloneDeep } from "lodash";
  import { CREATE_USER_NEIGHBOR, UPDATE_USER_NEIGHBOR } from "@/store/constants/action-constants";

  export default {
    props: {
      readonly: {
        type: Boolean,
        default: false
      },
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
        neighbor: { ...this.value }
      };
    },
    computed: {
      nameRules () {
        return [
          val => !!val || this.$t("common.error.validation.required"),
          ...this.nameMask
        ];
      },
      nameMask () {
        return [
          val => /^([A-zА-я-])+$/.test(val) || this.$t("common.error.validation.letters")
        ];
      },
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
        let label = "create";
        if (this.isUpdate) {
          label = "update";
        }
        this.$emit("submit", { label, neighbor: this.neighbor });
      },
      onCancel () {
        if (this.isUpdate) {
          this.discardChanges();
        } else {
          this.$emit("remove", this.index);
        }
      },
      discardChanges () {
        this.neighbor = cloneDeep(this.backup);
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
