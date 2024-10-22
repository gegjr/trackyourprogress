import {
    userDataType,
    userDataChartType,
    chartBarDatasetsBlankObjectType
} from '@/interfaces/index.ts'
import {defineStore} from 'pinia'
import {computed, ref} from "vue";
// TODO: WHF is the composables
import { useStorage } from '@vueuse/core'
import { useRoute } from 'vue-router'


export const useUserData = defineStore('userData', () => {
    const route = useRoute()

    // TODO: я не вижу как выглядит этот объект!!!
    const userData = ref<userDataType>({
        charts: useStorage('charts', []).value
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
    function getChartByUrl(url: string) {
        return userData.value.charts.find(x => x.url === url)
    }

    function getChartById(id: String) {
        return userData.value.charts.find(x => x.id === id)
    }

    function addUserData(obj: userDataChartType) {
        userData.value.charts.push(obj)
    }

    function addChartData(obj: chartBarDatasetsBlankObjectType, id: string) {
        const chartObj = getChartById(id)
        if(chartObj){
            chartObj.data.labels.push(obj.label)
            for (let i = 0; i < chartObj.data.datasets.length; i++) {
                chartObj.data.datasets[i].data.push(obj.data)
            }
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

    function deleteChartData(id: string, index: number) {
        const chartObj = getChartById(id)
        if(chartObj){
            chartObj.data.labels.splice(index, 1)
            for (let i = 0; i < chartObj.data.datasets.length; i++) {
                chartObj.data.datasets[i].data.splice(index, 1)
            }
        }
    }

    function addNewBar(id: String){
        const chartObj = getChartById(id)
        if(chartObj){
            chartObj.data.datasets.push({
                backgroundColor: "lightgrey",
                data: new Array(chartObj.data.datasets[0].data.length),
                label: 'label 3'
            })
        }
    }

    function deleteChartById(id: String){
        const index =  userData.value.charts.findIndex(x => x.id === id)
        userData.value.charts.splice(index, 1)
    }

    function getEditableChartData(id: String){
        const chartObj = getChartById(id)
        if(chartObj){
            const result = {
                labels: chartObj.data.labels,
                datasets: chartObj.data.datasets,
            }
            return result
        }
        return false
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
