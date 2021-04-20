import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/artist/:artistId',
    name: 'Artist',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "artist" */ '../views/Artist.vue')
  },
  {
    path: '/album/:albumId',
    name: 'Album',
    component: () => import(/* webpackChunkName: "album" */ '../views/Album.vue')
  },
  {
    path: '/upload/:type',
    name: 'Upload',
    component: () => import(/* webpackChunkName: "upload" */ '../views/UploadForm.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
