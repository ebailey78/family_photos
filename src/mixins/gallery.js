export default {
  computed: {
    page: {
      get() {
        return this.$store.getters['gallery/page']
      },
      set(v) {
        this.$store.commit("gallery/SET_PAGE", v)
      },
    },
    itemsPerPage: {
      get() {
        return this.$store.getters['gallery/itemsPerPage']
      },
      set(v) {
        this.$store.commit("gallery/SET_ITEMS_PER_PAGE", v)
      }
    },
    search: {
      get() {
        return this.$store.getters["gallery/search"]
      },
      set(v) {
        this.$store.commit("gallery/SET_SEARCH", v)
      }
    },
    sortBy: {
      get() {
        return this.$store.getters["gallery/sortBy"]
      },
      set(v) {
        this.$store.commit("gallery/SET_SORT_BY", v)
      }
    },
    sortDesc: {
      get() {
        return this.$store.getters["gallery/sortDesc"]
      },
      set(v) {
        this.$store.commit("gallery/SET_SORT_DESC", v)
      }
    },
    activeImage: {
      get() {
        return this.$store.getters['gallery/activeImage']
      },
      set(v) {
        this.$store.commit("SET_ACTIVE_IMAGE", v)
      }
    },
    photoCount() {
      return this.$store.getters['gallery/photoCount']
    },
    lastPage() {
      return this.$store.getters["gallery/lastPage"]
    },
    photos() {
      return this.$store.getters["gallery/photos"]
    }
  }
}