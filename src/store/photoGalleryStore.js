// import Vue from 'vue'
import axios from "@/services/axios"

let state = {
  page: 1,
  itemsPerPage: 20,
  search: "",
  sortBy: [],
  sortDesc: [],
  photos: [],
  photoCount: 300,
  displayTypes: ['list', 'tile-small', 'tile-large'],
  activeImage: {}
}

let mutations = {
  SET_PAGE: (state, payload) => state.page = payload,
  SET_ITEMS_PER_PAGE: (state, payload) => state.itemsPerPage = payload,
  SET_SEARCH: (state, payload) => state.search = payload,
  SET_SORT_BY: (state, payload) => state.sortBy = payload,
  SET_SORT_DESC: (state, payload) => state.sortDesc = payload,
  SET_PHOTOS: (state, payload) => state.photos = payload,
  SET_PHOTO_COUNT: (state, payload) => state.photoCount = payload,
  SET_ACTIVE_IMAGE: (state, payload) => state.activeImage = payload
}

let getters = {
  page: state => state.page,
  itemsPerPage: state => state.itemsPerPage,
  search: state => state.search,
  sortBy: state => state.sortBy,
  sortDesc: state => state.sortDesc,
  photos: state => state.photos,
  photoCount: state => state.photoCount,
  displayTypes: state => state.displayTypes,
  activeImage: state => state.activeImage,
  photo: state => {
    return function(index) {
      return state.photos[index]
    }
  },
  lastPage: state => {
    return parseInt(state.photoCount / state.itemsPerPage)
  }
}

let actions = {
  async get({getters, commit}) {
    let payload = {
      page: getters.page,
      itemsPerPage: getters.itemsPerPage
    }
    let resp = await axios.get("photos", payload)
    commit("SET_PHOTOS", resp.data)
  }
}

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
}