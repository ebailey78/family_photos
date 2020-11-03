import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routeOptions = [
  {name: "home", path: "/", component: "Home", meta: {auth: false}},
  {name: "gallery", props: true, path: "/gallery/:view", component: "photoGallery", meta: {auth: true}},
  {name: "photo", props: true, path: "/photo/:photoId", component: "Photo", meta: {title: "Photos", auth: true}},
  {name: "person", path: "/people/:personId", component: "Person", meta: {title: "People", auth: true}},
  {name: "people", path: "/people", component: "People", meta: {title: "People", auth: true}},
  {name: "admin", path: "/admin", component: "Admin", meta: {title: "Admin", auth: true, admin: true}},
]

const routes = routeOptions.map(route => {
  return {
    ...route,
    component: () => import(`../views/${route.component}.vue`)
  }
})

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  document.title = "Family Photos"
  next()

})

export default router
