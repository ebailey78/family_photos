<template>
  <v-app id="familyPhotos">
    <fp-app-bar v-if="loggedIn"></fp-app-bar>
    <fp-app-sidebar
      v-if="loggedIn"
      v-model="sidebarVisible"
    ></fp-app-sidebar>
    <v-main class="accent lighten-5">
      <router-view></router-view>
    </v-main>
    <!-- <v-main v-if="loggedIn"> 
      <v-container
        fluid
        class="grey lighten-4 fill-height"
      >
        <fp-photo-gallery
          @showImage="showImage"
          :page="page"
        ></fp-photo-gallery>
        <v-row>

        </v-row>
      </v-container>
    </v-main> -->
    <!-- <fp-photo-upload-dialog></fp-photo-upload-dialog>  
    <fp-user-login-dialog></fp-user-login-dialog> -->
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      sidebarVisible: false,
      imageDialogVisible: false,
      uploadDialogVisible: false,
      addPersonDialogVisible: false,
      selectedImage: {},
    }),
    computed: {
      page: {
        get() { return this.$store.getters['photo/page'] },
        set(v) { this.$store.commit("photo/SET_PAGE", v) }
      },
      pageSize() {
        return this.$vuetify.breakpoint.name
      },
      loggedIn() {
        return this.$store.getters['loggedIn']
      }
    },
    methods: {
      showImage(image) {
        this.selectedImage = image
        this.imageDialog = true
      },
    }
  }
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>
