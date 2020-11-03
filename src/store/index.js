import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistance from "vuex-persist"
import jwt_decode from 'jwt-decode'

Vue.use(Vuex)

const vuexLocal = new VuexPersistance({
  storage: window.localStorage,
  key: "familyPhotos",
})

import photoGallery from '@/store/photoGalleryStore'

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    gallery: photoGallery
  },
  state: {
    sidebar: false,
    newUserDialog: false,
    photoUploadDialog: false,
    token: null
  },
  mutations: {
    SET_SIDEBAR: (state, payload) => state.sidebar = payload,
    SET_NEW_USER_DIALOG: (state, payload) => state.newUserDialog = payload,
    SET_PHOTO_UPLOAD_DIALOG: (state, payload) => state.photoUploadDialog = payload,
    SET_USER_LOGIN_DIALOG: (state, payload) => state.userLoginDialog = payload,
    SET_TOKEN: (state, payload) => {
      if(payload !== null) {
        console.log("Adding Bearer Token")
        Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${payload}`
      } else {
        console.log("Removing Bearer Token")
        Vue.axios.defaults.headers.common['Authorization'] = null
      }
      state.token = payload
    }
  },
  actions: {
  },
  getters: {
    sidebar: state => state.sidebar,
    newUserDialog: state => state.newUserDialog,
    photoUploadDialog: state => state.photoUploadDialog,
    token: state => state.token,
    token_payload: state => {
      if(state.token != null) {
        return jwt_decode(state.token) || {exp: 0}
      } else {
        return {
          exp: 0
        }
      }        
    },
    exp: (state, getters) => {
      return getters.token_payload.exp
    },
    loggedIn: (state, getters) => {
      return Date.now() <= getters.exp
    },
    user_level: (state, getters) => {
      return getters.token_payload.acc
    }
  }
})
