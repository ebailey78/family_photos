import Vue from 'vue'

import adminMenu from './adminMenu.vue'

import newUserDialog from './newUserDialog.vue'
import userLoginDialog from "./userLoginDialog.vue"

import appBar from './appBar'
import appSideBar from './appSidebar'
import viewSelector from './viewSelector'
import pageSelector from './pageSelector'
import cardTitle from './cardTitle'

import newPersonDialog from './people/newPersonDialog'
import nameInput from './people/nameInput'
import datePicker from "./people/datePicker"
import personSelector from "./people/personSelector"

import photoGallery from './photos/photoGallery'
import photoDialog from './photos/photoDialog'
import photoTile from './photos/photoTile'
import photoUpload from './photos/photoUpload'

let components = [
  appBar,
  appSideBar,
  viewSelector,
  pageSelector,
  cardTitle,

  adminMenu,
  newUserDialog,
  userLoginDialog,

  newPersonDialog,
  nameInput,
  datePicker,
  personSelector,

  photoGallery,
  photoDialog,
  photoTile,
  photoUpload
]

components.forEach(component => {
  Vue.component(component.name, component)
})