<template>
  <v-navigation-drawer
    v-model="visible"
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
</template>

<script>
export default {
  name: "fpAppSidebar",
  props: {
  },
  data() {
    return {
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
    }
  },
  computed: {
    visible: {
      get() {
        return this.$store.getters['sidebar']
      },
      set(v) {
        this.$store.commit("SET_SIDEBAR", v)
      }
    }
  }
}
</script>