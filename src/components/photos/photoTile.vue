<template>
  <span>
    <v-card
      :elevation = "elevation"
      @mouseenter="elevation=8"
      @mouseleave="elevation=5"
      :class="{ smallPhotoTile: displaySmall }"
    >
      <v-img 
        style="cursor: pointer"
        :src="`http://localhost:3000/img/thumbnails/${image.photoId}.jpg`"
        :lazy-src="image.thumbname"
        class="grey lighten-2"
        @click="showImage"
      ></v-img>
    <v-card-text v-if="metadata">
      <v-list dense disabled>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-icon><v-icon color="primary">fa-fw fa-map-marker-alt</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Green House</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon><v-icon color="primary">fa-fw fa-users</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title><v-chip x-small>Bailey, Eric</v-chip><v-chip x-small>Warmoth, Cheryl</v-chip></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon><v-icon color="primary">fa-fw fa-calendar</v-icon></v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>1983</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
    </v-card>
  </span>
</template>

<script>
  export default {
    name: 'fpPhotoTile',
    props: {
      image: {
        
      },
      photoDialogVisible: {
        type: Boolean,
        default: false
      },
      metadata: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        showMeta: this.metadata,
        showDialog: false,
        elevation: 6
      }
    },
    computed: {
      displaySmall() {
        return this.$store.getters['gallery/displayType'] == "tile-small"
      },
      popupVisible: {
        get() {
          return this.photoDialogVisible
        },
        set(v) {
          this.$emit("update:photoDialogVisible", v)
        }
      }
    },
    methods: {
      showImage() {
        this.$router.push({name: "photo", params: {photoId: this.image.photoId}})
        // this.$store.commit("gallery/SET_ACTIVE_IMAGE", this.image),
        // this.popupVisible = true
      }
    },
  }
</script>

<style scoped>

  .smallPhotoTile:hover {
    transform: scale(1.1)    
  }

</style>