<template lang="pug">
  div.column
    h3.text-title
      | Dropdown
    h4.text-medium-b
      | With icon
    div.row.q-gutter-md.justify-star
      div.col
        BaseSelect(v-model="dropdown" :options="options" label="With Icon" clearable)
          template(v-slot:prepend)
            q-icon(name="search")
      div.col
        BaseSelect(v-model="dropdown" :options="options" label="Outlined" outlined)
          template(v-slot:prepend)
            q-icon(name="search")
      div.col
        BaseSelect(v-model="dropdown" :options="options" label="Multiple" multiple)
          template(v-slot:prepend)
            q-icon(name="search")
      div.col
        BaseSelect(v-model="dropdown" :options="customOptions" label="Options")
          template(v-slot:prepend)
            q-icon(name="search")
          template(v-slot:option="scope")
            q-item(v-bind="scope.itemProps" v-on="scope.itemEvents")
              q-item-section(avatar)
                q-icon(:name="scope.opt.icon")
              q-item-section
                q-item-label(v-html="scope.opt.label")
                q-item-label(caption)
                  | {{ scope.opt.description }}z
      div.col
        BaseSelect(v-model="dropdown" :options="options" label="Readonly" readonly)
          template(v-slot:prepend)
            q-icon(name="search")
      div.col
        BaseSelect(v-model="dropdown" :options="options" label="Disabled" disable)
          template(v-slot:prepend)
            q-icon(name="search")

    h4.text-medium-b
      | Primary
    div.row.q-py-xs.q-gutter-md.justify-start
      div.col
        BaseSelect(v-model="dropdown" :options="options" label="Primary" clearable)
      div.col
        BaseSelect(v-model="dropdown" :options="options" label="Outlined" outlined)
      div.col
        BaseSelect(v-model="dropdown" :options="options" label="Multiple" multiple)
      div.col
        BaseSelect(v-model="dropdown" :options="customOptions" label="Options")
          template(v-slot:option="scope")
            q-item(v-bind="scope.itemProps" v-on="scope.itemEvents")
              q-item-section(avatar)
                q-icon(:name="scope.opt.icon")
              q-item-section
                q-item-label(v-html="scope.opt.label")
                q-item-label(caption)
                  | {{ scope.opt.description }}
      div.col
        BaseSelect(v-model="dropdown" :options="options" label="Primary" readonly)
      div.col
        BaseSelect(v-model="dropdown" :options="options" label="Primary" disable)
    h3.text-title
      | Autocomplete
    div.row.q-gutter-md.justify-star
      BaseAutocomplete(
        v-model="autocompleteValue"
        :options="customOptions"
        field="label"
        prop="value"
        label="With icon"
        hide-selected
        fill-input
        use-input
        )
        template(v-slot:prepend)
          q-icon(name="search")
        template(v-slot:no-option)
          q-item
            q-item-section.text-grey
              | No results
      BaseAutocomplete(
        :value="autocompleteValue"
        :options="customOptions"
        field="label"
        prop="value"
        label="Primary"
        hide-selected
        fill-input
        use-input)
        template(v-slot:no-option)
          q-item
            q-item-section.text-grey
              | No results
      BaseAutocomplete(
        :value="autocompleteValue"
        :options="customOptions"
        label="Outlined"
        hide-selected
        fill-input
        outlined
        use-input)
        template(v-slot:no-option)
          q-item
            q-item-section.text-grey
              | No results
      BaseAutocomplete(
        :value="autocompleteValue"
        :options="customOptions"
        label="Readonly"
        hide-selected
        fill-input
        readonly
        use-input)
        template(v-slot:no-option)
          q-item
            q-item-section.text-grey
              | No results
      BaseAutocomplete(
        :value="autocompleteValue"
        :options="customOptions"
        label="Disabled"
        hide-selected
        fill-input
        disable
        use-input)
        template(v-slot:no-option)
          q-item
            q-item-section.text-grey
              | No results
</template>

<script>
  import BaseSelect from "components/common/BaseSelect";
  import BaseAutocomplete from "components/common/BaseAutocomplete";

  export default {
    name: "Selects",
    components: { BaseAutocomplete, BaseSelect },
    data () {
      return {
        dropdown: null,
        autocompleteValue: null
      };
    },
    computed: {
      options: () => [
        "Google", "Facebook", "Twitter", "Apple", "Oracle"
      ],

      customOptions: () => [
        {
          label: "Google",
          value: "Google",
          description: "Search engine",
          icon: "mail"
        },
        {
          label: "Facebook",
          value: "Facebook",
          description: "Social media",
          icon: "bluetooth"
        },
        {
          label: "Twitter",
          value: "Twitter",
          description: "Quick updates",
          icon: "map"
        },
        {
          label: "Apple",
          value: "Apple",
          description: "iStuff",
          icon: "golf_course"
        },
        {
          label: "Oracle",
          value: "Oracle",
          disable: true,
          description: "Databases",
          icon: "casino"
        }
      ],

      isEmailValid () {
        const isEmail = (value = "") => new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$").test(value);

        return !this.email || isEmail(this.email);
      }
    }
  };
</script>

<style scoped>

</style>
