type barMargin = {
    left: number,
    top: number,
    right: number,
    bottom: number,
}

type Marker = {
    fill: string,
}

type chartDataType = {
    name: string,
    value: number,
    markers?: Marker[]
}

export type {
    barMargin,
    Marker,
    chartDataType
}
