import { defineStore } from 'pinia'
import {computed, ref} from "vue";
export const useUserData = defineStore('userData', () => {
    const userData = {
        charts: {
            'bar-chart': {
                type: 'bar-chart',
                title: 'First',
                data: 'first data'
            },
            'points-chart': {
                type: 'points-chart',
                title: 'second',
                data: 'second data'
            },
            'radar-chart': {
                type: 'radar-chart',
                title: 'third',
                data: 'third data'
            }
        }
    }

    const getChartTitles = computed(() => {
            return ['bar-chart', 'bar-chart']
        }
    )


    return { userData, getChartTitles }
})
