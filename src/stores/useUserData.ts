import {defineStore} from 'pinia'
import {computed, ref} from "vue";
// TODO: WHF is the composables
import { useStorage } from '@vueuse/core'


export const useUserData = defineStore('userData', () => {
    // TODO: я не вижу как выглядит этот объект!!!
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

    function getChartById(id) {
        return userData.value.charts.find(x => x.id === id)
    }

    function addUserData(obj) {
        userData.value.charts.push(obj)
    }

    function addChartData(obj, id) {
        const chartObj = getChartById(id)
        chartObj.data.labels.push(obj.label)
        // yes, this is harsh (push === infinite loop inside chart object inner data watcher)
        // TODO: создать репрезентацию и проверить отдельно (текущее удаление === перевод datasets.data в null => нельзя опираться на его длину)
        chartObj.data.datasets[0].data[chartObj.data.labels.length] = obj.data
    }

    function deleteChartData(id, index) {
        const chartObj = getChartById(id)
        delete chartObj.data.labels.splice(index, 1)
        // yes, this is harsh (push === infinite loop inside chart object inner data watcher)
        delete chartObj.data.datasets[0].data[index]
    }

    function deleteChartById(id){
        const index =  userData.value.charts.findIndex(x => x.id === id)
        // TODO: slice and splice sukaa
        userData.value.charts.splice(index, 1)
    }

    function getEditableChartData(id){
        const chartObj = getChartById(id)
        const result = {
            labels: chartObj.data.labels,
            data: chartObj.data.datasets[0].data,
        }

        return result
    }

    return {
        userData,
        getChartTitles,
        getChartByUrl,
        addUserData,
        deleteChartById,
        getEditableChartData,
        addChartData,
        deleteChartData
    }
})
