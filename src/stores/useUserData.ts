import {defineStore} from 'pinia'
import {computed, ref} from "vue";
// TODO: WHF is the composables
import { useStorage } from '@vueuse/core'

export const useUserData = defineStore('userData', () => {
    const userData = ref({
        charts: useStorage('charts', [])
    })

    const getChartTitles = computed(() => {
        let result = []
        for (const item of userData.value.charts) {
            let temp = {
                url: item.url,
                title: item.title,
                type: item.type
            }
            result.push(temp)
        }
        return result
    })

    function getChartByUrl(url) {
        return userData.value.charts.find(x => x.url === url)
    }

    function addUserData(obj) {
        userData.value.charts.push(obj)
    }

    return {userData, getChartTitles, getChartByUrl, addUserData}
})
