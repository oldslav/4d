<template lang="pug">
  div.q-mx-xl
    div.column
      h3.text-title
        | Primary buttons
      div.row.q-gutter-md.justify-start
        q-btn(color="primary" label="With icon" icon="icon-pet")
        q-btn(color="primary" label="Primary")
        q-btn(color="primary" label="Outlined" outline)
        q-btn(color="primary" label="Outlined" disable)

      h3.text-title
        | Flat buttons
      div.row.q-gutter-md.justify-start
        q-btn(color="primary" label="With icon" icon="icon-pet" flat)
        q-btn(color="primary" label="Primary" flat)
        q-btn(color="primary-flat" label="With icon" icon="add" flat)
        q-btn(color="primary-flat__bordered" label="Bordered" icon="add" flat)

    div.column
      h3.text-title
        | Input
      h4.text-medium-b
        | With icon
      div.row.q-py-xs.q-gutter-md.justify-start
        div
          q-input(v-model="search" color="purple-12" label="With icon" clearable wrap)
            template(v-slot:prepend)
              q-icon(name="search")
        div
          q-input(v-model="search" color="purple-12" label="Outlined" outlined)
            template(v-slot:prepend)
              q-icon(name="search")
        div
          q-input(v-model="search" color="purple-12" label="Readonly" readonly)
            template(v-slot:prepend)
              q-icon(name="search")
        div
          q-input(v-model="search" color="purple-12" label="Disabled" disable)
            template(v-slot:prepend)
              q-icon(name="search")

      h4.text-medium-b
        | Primary
      div.row.q-py-xs.q-gutter-md.justify-start
        div
          q-input(v-model="search" color="purple-12" label="Primary" clearable)
        div
          q-input(v-model="search" color="purple-12" label="Outlined" outlined)
        div
          q-input(v-model="search" color="purple-12" label="Readonly" readonly)
        div
          q-input(v-model="search" color="purple-12" label="Disabled" disable)

    div.column
      h3.text-title
        | Dropdown
      h4.text-medium-b
        | With icon
      div.row.q-gutter-md.justify-star
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="options" label="With Icon" clearable)
            template(v-slot:prepend)
              q-icon(name="search")
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="options" label="Outlined" outlined)
            template(v-slot:prepend)
              q-icon(name="search")
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="options" label="Multiple" multiple)
            template(v-slot:prepend)
              q-icon(name="search")
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="customOptions" label="Options")
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
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="options" label="Readonly" readonly)
            template(v-slot:prepend)
              q-icon(name="search")
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="options" label="Disabled" disable)
            template(v-slot:prepend)
              q-icon(name="search")

      h4.text-medium-b
        | Primary
      div.row.q-py-xs.q-gutter-md.justify-start
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="options" label="Primary" clearable)
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="options" label="Outlined" outlined)
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="options" label="Multiple" multiple)
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="customOptions" label="Options")
            template(v-slot:option="scope")
              q-item(v-bind="scope.itemProps" v-on="scope.itemEvents")
                q-item-section(avatar)
                  q-icon(:name="scope.opt.icon")
                q-item-section
                  q-item-label(v-html="scope.opt.label")
                  q-item-label(caption)
                    | {{ scope.opt.description }}
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="options" label="Primary" readonly)
        div.col-1
          q-select(v-model="dropdown" color="purple-12" :options="options" label="Primary" disable)
      h3.text-title
        | Autocomplete
      div.row.q-gutter-md.justify-star
        q-select(
          :value="autocompleteValue"
          :options="autocompleteOptions"
          @filter="filterFn"
          @input-value="setAutocompleteValue"
          color="purple-12"
          label="With icon"
          hide-selected
          fill-input
          use-input)
          template(v-slot:prepend)
            q-icon(name="search")
          template(v-slot:no-option)
            q-item
              q-item-section.text-grey
                | No results
        q-select(
          :value="autocompleteValue"
          :options="autocompleteOptions"
          @filter="filterFn"
          @input-value="setAutocompleteValue"
          color="purple-12"
          label="Primary"
          hide-selected
          fill-input
          use-input)
          template(v-slot:no-option)
            q-item
              q-item-section.text-grey
                | No results
        q-select(
          :value="autocompleteValue"
          :options="autocompleteOptions"
          @filter="filterFn"
          @input-value="setAutocompleteValue"
          color="purple-12"
          label="Outlined"
          hide-selected
          fill-input
          outlined
          use-input)
          template(v-slot:no-option)
            q-item
              q-item-section.text-grey
                | No results
        q-select(
          :value="autocompleteValue"
          :options="autocompleteOptions"
          @filter="filterFn"
          @input-value="setAutocompleteValue"
          color="purple-12"
          label="Readonly"
          hide-selected
          fill-input
          readonly
          use-input)
          template(v-slot:no-option)
            q-item
              q-item-section.text-grey
                | No results
        q-select(
          :value="autocompleteValue"
          :options="autocompleteOptions"
          @filter="filterFn"
          @input-value="setAutocompleteValue"
          color="purple-12"
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
  // TODO: Сделать Autocomplete отдельным компонентом
  // TODO: Сделать Select отдельным компонентом (предпосылка - кастомные айтемы слишком многословны, нужна обёртка)

  export default {
    name: "UIPlayground",
    data () {
      return {
        search: null,
        dropdown: null,
        autocompleteValue: null,
        autocompleteOptions: null
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
    },
    methods: {
      filterFn (val, update) {
        update(() => {
          const needle = val.toLocaleLowerCase();
          this.autocompleteOptions = this.options.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1);
        });
      },

      setAutocompleteValue (val) {
        this.autocompleteValue = val;
      }
    }
  };
</script>

<style lang="stylus">

</style>
