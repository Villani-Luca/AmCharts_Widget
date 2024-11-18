import { ReactElement, createElement } from "react";
import {ValueStatus} from "mendix";
import { HorizzontalColumnChartContainerProps } from "../typings/HorizzontalColumnChartProps";

import "./ui/HorizzontalColumnChart.css";
import Chart, { DataJson } from "./components/Chart";

export function HorizzontalColumnChart(props: HorizzontalColumnChartContainerProps): ReactElement {
    const datasource = props.dataList;
    if (!datasource || datasource.status !== ValueStatus.Available || !datasource.items) {
        return <div>Non ci sono dati disponibili</div>;
    }
    let dataArray: Array<DataJson>=[];
    props.dataList?.items?.map((item)=> {
        let tmp={} as DataJson;
        tmp.category = props.category?.get(item).value;
        tmp.value = props.value?.get(item).value?.toNumber();
        dataArray.push(tmp);
    });
    
    return <Chart props={props} dataJson={dataArray} chartHeight={props.heightChart} chartWidth={props.widthChart}/>;
}