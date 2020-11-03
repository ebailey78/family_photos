<template>
  <v-btn-toggle 
    v-model="displaySelect"
    color='primary'
    dense
    dark
    group
    mandatory
  >
    <v-btn disabled><v-icon>fa-th-list</v-icon></v-btn>
    <v-btn><v-icon>fa-th</v-icon></v-btn>
    <v-btn><v-icon>fa-th-large</v-icon></v-btn>
  </v-btn-toggle> 
</template>

<script>

import gallery from "@/mixins/gallery"

export default {
  name: "fpViewSelector",
  mixins: [gallery],
  data() {
    return {

    }
  },
  updated() {
    console.log(this.viewType)
  },
  computed: {
    type() {
      return this.viewType
    },
    displaySelect: {
      get() {
        return this.$store.getters['gallery/displayTypes'].indexOf(this.type) || 'tile-small';
      },
      set(v) {
        this.$router.push({name: "gallery", params: {view: this.$store.getters['gallery/displayTypes'][v]}})
      }
    },    
  },
  watch: {
    type(v) {
      console.log(v)
    },
    displaySelect(v) {
      v
    }
  }
}
</script>