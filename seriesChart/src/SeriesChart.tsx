import { ReactElement, createElement } from "react";


import "./ui/SeriesChart.css";
import { SeriesChartContainerProps } from "typings/SeriesChartProps";
import Chart, { ChartInputProps, DataJson } from "./components/Chart";

export function SeriesChart(props: SeriesChartContainerProps): ReactElement {
    const seriesList = props.seriesList;
    if (!seriesList) {
        return <div>Non ci sono serie configurate disponibili</div>;
    }

    let arr: DataJson[] = [];
    let seriesname: ChartInputProps['series'] = [];

    for(const series of seriesList){
        const name = series.seriesName.value?.toString()!;
        seriesname.push({name: name, displayname: name});
        for(const datapoint of series.dataList.items ?? []){
            const value = series.value?.get(datapoint).value?.toNumber();
            const category = series.category?.get(datapoint).value?.toString();

            const found = arr.find(x => x.category === category);
            if(!found){
                let v: DataJson = { category: category ?? '', };
                v[name] = value ?? 0;
                arr.push(v)
            }
            else {
                found[name] = value ?? 0;
            }
        }
    }        
    console.info(arr);
    console.info(seriesname);
    //{category: '1-2024', Biancheria: 141213, Divise: 136805}

    // arr = [{
    //         category: 'uno',
    //         test1: 1,
    //         test2: 2,
    //     },
    //     {
    //         category: 'due',
    //         test1: 3,
    //         test2: 1,
    //     },
    //     {
    //         category: 'tre',
    //         test1: 4,
    //         test2: 2,
    //     }
    // ]

    // seriesname = [{name: 'test1', displayname: 'Test 1'}, {name: 'test2', displayname: 'Test 2'}];
    let test = arr[0];
    let keys = !test ? 0 : Object.keys(test).length

   if(keys === seriesList.length + 1)
     return <Chart props={props} dataJson={arr} series={seriesname} chartHeight={props.heightChart} chartWidth={props.widthChart}/> 

   return <div>CIAO</div>;
}
