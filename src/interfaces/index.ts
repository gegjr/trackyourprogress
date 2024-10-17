
export type chartDataType = {
    datasets: Array<chartBarDatasetsObjectType>;
    labels: Array<string>;
}

export type chartObjType = {
    data: Object,
    description: string,
    id: string,
    title: string,
    type: string,
    url: string,
}

// TODO: proper store typing
export type userDataChartType = {
    data: chartDataType,
    description: string,
    id: string,
    title: string,
    type: string,
    url: string,
}

export type userDataType = {
    charts: userDataChartType[]
}

export type chartBarDatasetsObjectType = {
    backgroundColor: string,
    data: Array<string | number>,
    label: string
}

export type chartBarDatasetsBlankObjectType = {
    backgroundColor: string,
    data: string | number,
    label: string
}
