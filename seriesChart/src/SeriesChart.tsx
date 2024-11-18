import { ReactElement, createElement } from "react";


import "./ui/SeriesChart.css";
import { SeriesChartContainerProps } from "typings/SeriesChartProps";




export function SeriesChart(props: SeriesChartContainerProps): ReactElement {
    const seriesList = props.seriesList;
    if (!seriesList) {
        return <div>Non ci sono serie configurate disponibili</div>;
    }

    props.seriesList

   return <div></div>;
}
