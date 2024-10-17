import { createRouter, createWebHistory } from 'vue-router'
import TestView from '@/views/TestView.vue'
import HomeView from '../views/HomeView.vue'
import AddNewView from '../views/AddNewView.vue'
import DynamicView from '../views/DynamicView.vue'

// TODO: check for dynamic component import for routes
const routes = [
    {
        path: '/test',
        name: 'test',
        component: TestView
    },
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/add-new-chart',
        name: 'add-new',
        component: AddNewView
    },
    { path: '/:url', component: DynamicView },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default  router
