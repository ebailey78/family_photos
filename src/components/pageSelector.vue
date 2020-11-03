<template>
  <span>
    <v-btn icon @click="page--" title="previous page" :disabled="page==1"><v-icon>fa-chevron-left</v-icon></v-btn>
    <span style="font-weight: normal; font-size: 1.2em">{{page}} / {{lastPage}}</span>
    <v-btn icon @click="page++" title="next page" :disabled="page >= lastPage"><v-icon>fa-chevron-right</v-icon></v-btn>
  </span>
</template>

<script>

import gallery from "@/mixins/gallery"

export default {
  name: "fpPageSelector",
  mixins: [gallery],
  data() {
    return {

    }
  }
}
</script>