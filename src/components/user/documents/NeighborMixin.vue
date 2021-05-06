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
      }
    },
    data () {
      return {
        neighbor: deepClone(this.value),
        nameRules: [
          val => !!val || "Поле обязательно к заполнению"
        ]
      };
    },
    computed: {
      isChanged () {
        return !isEqual(this.value, this.neighbor);
      },
      isUpdate () {
        return !!this.neighbor.id;
      }
    },
    methods: {
      ...mapActions("user/neighbors", [CREATE_USER_NEIGHBOR, UPDATE_USER_NEIGHBOR]),
      onSubmit () {
        let action;
        if (this.isUpdate) {
          action = this[UPDATE_USER_NEIGHBOR];
        } else {
          action = this[CREATE_USER_NEIGHBOR];
        }
        return action.call(this, this.neighbor);
      },
      onCancel () {
        if (this.isUpdate) {
          this.discardChanges();
        } else {
          this.$emit("remove", this.index);
        }
      },
      discardChanges () {
        this.neighbor = deepClone(this.value);
      },
      onRemove (id) {
        this.$emit("removeFile", id);
      }
    },
    watch: {
      value: {
        deep: true,
        handler (val) {
          this.neighbor = deepClone(val);
        }
      }
    }
  };
</script>
