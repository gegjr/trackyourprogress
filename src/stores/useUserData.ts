import {defineStore} from 'pinia'
import {computed, ref} from "vue";
// TODO: WHF is the composables
import { useStorage } from '@vueuse/core'
import { useRoute } from 'vue-router'


export const useUserData = defineStore('userData', () => {
    const route = useRoute()

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


    const currentChartObj = computed(() => {
        return userData.value.charts.find(x => x.url === route.params.url)
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
        for (let i = 0; i < chartObj.data.datasets.length; i++) {
            chartObj.data.datasets[i].data[chartObj.data.labels.length - 1] = obj.data
        }
    }
    function addEmptyBarDatasetsItem(){
        if(currentChartObj.value){
            const emptyObj = {
                label: "Name",
                backgroundColor: "#333333",
                data: new Array(currentChartObj.value.data.datasets[0].data.length)
            }

            currentChartObj.value.data.datasets.push(emptyObj)
        }
    }

    function deleteChartData(id, index) {
        const chartObj = getChartById(id)
        chartObj.data.labels.splice(index, 1)
        for (let i = 0; i < chartObj.data.datasets.length; i++) {
            chartObj.data.datasets[i].data.splice(index, 1)
        }
    }

    function addNewBar(id, index){
        const chartObj = getChartById(id)
        chartObj.data.datasets.push({
            backgroundColor: "lightgrey",
            data: new Array(chartObj.data.datasets[0].data.length),
            label: 'label 3'
        })
    }

    function deleteChartById(id){
        const index =  userData.value.charts.findIndex(x => x.id === id)
        userData.value.charts.splice(index, 1)
    }

    function getEditableChartData(id){
        const chartObj = getChartById(id)
        const result = {
            labels: chartObj.data.labels,
            datasets: chartObj.data.datasets,
        }

        return result
    }

    return {
        userData,
        getChartTitles,
        currentChartObj,
        addEmptyBarDatasetsItem,
        getChartByUrl,
        addUserData,
        deleteChartById,
        getEditableChartData,
        addChartData,
        deleteChartData,
        addNewBar
    }
})
