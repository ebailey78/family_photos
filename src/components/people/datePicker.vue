<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        dense
        v-model="date"
        :label="label"
        :prepend-icon="icon"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="new Date().toISOString().substr(0, 10)"
      min="1800-01-01"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    name: "fpDatePicker",
    props: {
      value: {
        required: true
      },
      label: {
        type: String,
        default: "Date"
      },
      icon: {
        type: String,
        default: "mdi-calendar"
      }
    },
    data: () => ({
      menu: false,
    }),
    computed: {
      date: {
        get() { return this.value },
        set(v) { this.$emit("input", v) }
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
    },
  }
</script>