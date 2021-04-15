<template>
  <div>
    <div class="column">
      <h3 class="title">
        Input
      </h3>
      <div class="row q-gutter-md justify-start">
        <div class="col-1">
          <q-input v-model="search" color="purple-12" label="With icon" clearable>
            <template v-slot:prepend>
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-1">
          <q-input v-model="search" color="purple-12" label="Outlined" outlined></q-input>
        </div>

        <div class="col-1">
          <q-input v-model="search" color="purple-12" label="Regular" clearable></q-input>
        </div>

        <div class="col-1">
          <q-input v-model="search" color="purple-12" label="Readonly" readonly></q-input>
        </div>

        <div class="col-1">
          <q-input v-model="search" color="purple-12" label="Disabled" disable></q-input>
        </div>
      </div>
    </div>

    <div class="column">
      <h3 class="text-title">
        Dropdown
      </h3>
      <div class="row q-gutter-md justify-start">
        <div class="col-1">
          <q-select v-model="dropdown" color="purple-12" :options="options" label="With Icon">
            <template v-slot:prepend>
              <q-icon name="search"></q-icon>
            </template>
          </q-select>
        </div>

        <div class="col-1">
          <q-select v-model="dropdown" color="purple-12" :options="options" label="Outlined" outlined></q-select>
        </div>

        <div class="col-1">
          <q-select v-model="dropdown" color="purple-12" :options="options" label="Regular"></q-select>
        </div>

        <div class="col-1">
          <q-select v-model="dropdown" color="purple-12" :options="options" label="Multiple" multiple></q-select>
        </div>

        <div class="col-1">
          <q-select v-model="dropdown" color="purple-12" :options="customOptions" label="Options">
            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents">
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon"></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="scope.opt.label"></q-item-label>
                  <q-item-label caption>
                    {{ scope.opt.description }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <div class="col-1">
          <q-select v-model="dropdown" color="purple-12" :options="options" label="Readonly" readonly></q-select>
        </div>

        <div class="col-1">
          <q-select v-model="dropdown" color="purple-12" :options="options" label="Disabled" disable></q-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: null,
        dropdown: null
      };
    },
    computed: {
      options: () => [
        "Google", "Facebook", "Twitter", "Apple", "Oracle", "Google", "Facebook", "Twitter", "Apple", "Oracle"
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

<style lang="stylus" scoped>

</style>
