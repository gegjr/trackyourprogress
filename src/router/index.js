import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DynamicView from '../views/DynamicView.vue'

// TODO: check for dynamic component import for routes
const routes = [
    { path: '/about', component: HomeView },
    { path: '/:url', component: DynamicView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default  router
