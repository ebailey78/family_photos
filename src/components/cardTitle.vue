<template>
  <span>
    <v-skeleton-loader type="list-item-avatar-two-line" v-if="title==''" width="50%"></v-skeleton-loader>
    <v-list-item v-else>
      <v-list-item-avatar :color="iconColor" size="48"><v-icon dark size="24">{{icon}}</v-icon></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline pb-1" v-html="shownTitle" style="text-transformation: capitalize; line-height: 1em;" :style="{}"></v-list-item-title>
        <v-list-item-subtitle v-html="subtitle" v-if="subtitle" style="font-weight: bold; font-size: 1.02em;"></v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <slot name = "action">
          <!-- @slot Use this slot to place custom actions in the upper right -->
        </slot>
      </v-list-item-action>
    </v-list-item>
    <v-progress-linear
      :active="showProgressBar"
      :indeterminate="loading"
      v-model="progress"
    ></v-progress-linear>
    <v-divider v-if="!showProgressBar"></v-divider>
  </span>
</template>

<script>
export default {
  name: "fpCardTitle",
  props: {
    /**
     * The icon to display to the left of the title
     */
    icon: {
      type: String,
      default: "fa-user"
    },
    /**
     * The color of the icon
     */
    iconColor: {
      type: String,
      default: "primary"
    },    
    /**
     * The text to display as the title
     */
    title: {
      type: String,
      required: true,
    },
    mobileTitle: {
      type: String,
      required: false,
      default: null
    },
    /**
     * An optional subtitle
     */
    subtitle: {
      type: String,
      required: false
    },
    /**
     * What percentage of the progress bar should be filled?
     */
    progress: {
      type: Number,
      required: false,
      default: null
    },
    /**
     * Should the loading animation be displayed in the progress bar?
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * What color should the progress bar be when loading?
     */
    loadingColor: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    showProgressBar() {
      if(this.loading === true) return true
      if(this.progress !== null) return true
      return false
    },
    progressColor() {
      if(this.progress < 100) {
        return "warning"
      } else {
        return "success"
      }
    },
    shownTitle() {
      if(!this.$vuetify.breakpoint.mobile) {
        return this.title
      } else if(this.mobileTitle) {
        return this.mobileTitle
      } else {
        return this.title
      }
    }
  },  
  methods: {

  } 
}
</script>