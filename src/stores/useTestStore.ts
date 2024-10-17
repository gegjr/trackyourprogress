import {defineStore} from 'pinia'
// TODO: WHF is the composables
import {useStorage} from '@vueuse/core'


export const useTestStore = defineStore('testStore', () => {
    const userData = {
        charts: useStorage('chartsTest', [
            {
                title: "d2d2d",
                type: "bar",
                description: "",
                url: "d2d2d-bar",
                data: {
                    labels: ['fire', 'water'],
                    datasets: [{
                        label: "Label 1",
                        backgroundColor: "blue",
                        data: [1, 2, 3, 4, 5, 6]
                    }, {
                        label: "Label 2",
                        backgroundColor: "red",
                        data: [7, 8, 9, 10, 11, 12]
                    }]
                },
                id: "d2d2d-bar"
            }
        ])
    }

    function deleteDataFromChart(index: number){
        const chartObj = userData.charts.value[0]
        chartObj.data.labels.splice(index, 1)
        for (let i = 0; i < chartObj.data.datasets.length; i++) {
            chartObj.data.datasets[i].data.splice(index, 1)
        }
    }

    return {
        userData,
        deleteDataFromChart
    }
})
