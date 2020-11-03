<template>
  <v-app-bar
    app
    clipped-left
    color="primary"
    dark
  >
    <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
    <span class="title ml-3 mr-5"><v-icon class="mr-2">fa-portrait</v-icon>Family&nbsp;<span class="font-weight-light">Photos</span></span>
    <v-text-field
      solo-inverted
      flat
      hide-details
      label="Search"
      prepend-inner-icon="fa-search"
    ></v-text-field>
    <v-spacer></v-spacer>
    <fp-admin-menu v-if="admin"></fp-admin-menu>
    <fp-view-selector ></fp-view-selector>
    <v-divider vertical inset></v-divider>
    <fp-page-selector></fp-page-selector>
    <v-divider vertical inset></v-divider>
    <v-btn icon @click="$store.commit('SET_PHOTO_UPLOAD_DIALOG', true)" title="Upload Photos"><v-icon>fa-upload</v-icon></v-btn>
    <v-btn icon @click="logout" title="Sign Out"><v-icon>fa-sign-out-alt</v-icon></v-btn>
  </v-app-bar>
</template>

<script>

import gallery from "@/mixins/gallery"

export default {
  name: "fpAppBar",
  mixins: [gallery],
  props: {},
  data() {
    return {
    }
  },
  computed: {
    admin() {
      return this.$store.getters['user_level'] == 'admin'
    },
    loggedIn() {
      return this.$store.getters['loggedIn']
    },
    newUserDialog: {
      get() {return this.$store.getters['newUserDialog']},
      set(v) {this.$store.commit("SET_NEW_USER_DIALOG", v)}
    },
    sidebar: {
      get() {
        return this.$store.getters['sidebar']
      },
      set(v) {
        this.$store.commit("SET_SIDEBAR", v)
      }
    },
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', null)
      this.$router.push("/")
    }
  }
}
</script>