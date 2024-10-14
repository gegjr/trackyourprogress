import { createRouter, createWebHistory } from 'vue-router'
import AddNewView from '../views/AddNewView.vue'
import DynamicView from '../views/DynamicView.vue'

// TODO: check for dynamic component import for routes
const routes = [
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
