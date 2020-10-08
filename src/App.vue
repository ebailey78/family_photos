<template>
  <v-app id="keep">
    <v-app-bar
      app
      clipped-left
      color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">Family&nbsp;<span class="font-weight-light">Photos</span></span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-search"
      ></v-text-field>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-row
            v-if="item.heading"
            :key="i"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-right"
            >
              <v-btn
                small
                text
              >edit</v-btn>
            </v-col>
          </v-row>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-4"
          ></v-divider>
          <v-list-item
            v-else
            :key="i"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
        fluid
        class="grey lighten-4 fill-height"
      >
        <v-row
          justify="center"
          align="center"
        >
          <template v-for="n in 384">
            <v-col cols=12 md=4 lg=3 xl=2 :key="n">
              <picture-tile :id="n" @showImage="showImage"></picture-tile>
            </v-col>
          </template>
        </v-row>
        <v-row>
          <div class="text-center">
          <v-dialog v-model="imageDialog" width="1024px">
            <v-card>
              <v-card-title>{{selectedImageId}}</v-card-title>
              <v-img 
                contain
                :src="`https://picsum.photos/1000/600?image=${selectedImageId}`"
                :lazy-src="`https://picsum.photos/10/6?image=${selectedImageId}`"
                class="grey lighten-2"
              ></v-img>
              <v-card-text>
                {{selectedImageId}}
              </v-card-text>
            </v-card>
          </v-dialog>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

  import pictureTile from "./components/pictureTile.vue"

  export default {
    props: {
      source: String,
    },
    components: {pictureTile},
    data: () => ({
      drawer: false,
      imageDialog: false,
      selectedImageId: null,
      items: [
        { icon: 'mdi-lightbulb_outline', text: 'Notes' },
        { icon: 'mdi-touch_app', text: 'Reminders' },
        { divider: true },
        { heading: 'Labels' },
        { icon: 'mdi-add', text: 'Create new label' },
        { divider: true },
        { icon: 'mdi-archive', text: 'Archive' },
        { icon: 'mdi-delete', text: 'Trash' },
        { divider: true },
        { icon: 'mdi-settings', text: 'Settings' },
        { icon: 'mdi-chat_bubble', text: 'Trash' },
        { icon: 'mdi-help', text: 'Help' },
        { icon: 'mdi-phonelink', text: 'App downloads' },
        { icon: 'mdi-keyboard', text: 'Keyboard shortcuts' },
      ],
    }),
    methods: {
      showImage(id) {
        this.selectedImageId = id
        this.imageDialog = true
      }
    }
  }
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none
}
</style>
