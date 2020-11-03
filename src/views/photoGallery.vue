<template>
  <span>
    <v-data-iterator
      :items="photos"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :server-items-length="photoCount"
      hide-default-footer
    >
      <template v-slot:default="props">
        <v-row justify='center' align='center'>
          <template v-for='(photo, index) in props.items'>
            <v-col 
              :align-self='lg ? "baseline" : "center"' 
              cols=12 
              :xs="lg ? 12 : 12" 
              :sm="lg ? 12 : 6" 
              :md="lg ? 4 : 3" 
              :lg="lg ? 4 : 2" 
              :xl="lg ? 3 : 1" 
              :key="index"
            >
              <fp-photo-tile :metadata='lg' :image="photo" :photoDialogVisible.sync="photoDialogVisible"></fp-photo-tile>
            </v-col>
          </template>
        </v-row>
      </template>
    </v-data-iterator>
    <fp-photo-dialog
      :visible.sync="photoDialogVisible"
    ></fp-photo-dialog>
  </span>  

</template>

<script>

  import galleryMixin from "@/mixins/gallery"

  export default {
    name: "photoGallery",
    mixins: [galleryMixin],
    props: {
      view: {
        type: String
      }
    },
    data() {
      return {
        photoDialogVisible: false        
      }
    },
    updated() {
      console.log(this.$router.currentRoute)
    },
    computed: {
      lg() {
        return this.view === "tile-large"
      },
      pageSize() {
        return this.$vuetify.breakpoint.name
      },
    },
    methods: {
      async getPhotos() {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        })
        this.$store.dispatch("gallery/get")       
      },
      setItemsPerPage() {
        let cw;
        let lg = this.lg;
        switch(this.$vuetify.breakpoint.name) {
          case 'xl':
            cw = lg ? 3 : 1
            break;
          case 'lg':
            cw = lg ? 4 : 1
            break;
          case 'md':
            cw = lg ? 4 : 3
            break;
          case 'sm':
            cw = lg ? 12 : 6
            break;
          case 'xs':
            cw = lg ? 12 : 12
            break;
        }

        let cols = 12 / cw

        this.itemsPerPage = cols * 5
      },
      showImage(v) {
        this.$store.commit("gallery/SET_ACTIVE_IMAGE", v)
      }
    },
    watch: {
      page() {
        this.getPhotos()
      },
      view() {
        this.setItemsPerPage()
        this.getPhotos()
      },
      pageSize() {
        this.setItemsPerPage()
      }
    },
    mounted() {
      this.setItemsPerPage()
      this.getPhotos()
    }
  }
</script>