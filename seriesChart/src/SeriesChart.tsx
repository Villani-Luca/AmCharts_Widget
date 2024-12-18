import { ReactElement, createElement } from "react";


import "./ui/SeriesChart.css";
import { SeriesChartContainerProps } from "typings/SeriesChartProps";
import Chart, { ChartInputProps, DataJson } from "./components/Chart";
import { ValueStatus } from 'mendix';

export function SeriesChart(props: SeriesChartContainerProps): ReactElement {
    const seriesList = props.seriesList;
    if (!seriesList) {
        return <div>Non ci sono serie configurate disponibili</div>;
    }

    let arr: DataJson[] = [];
    let seriesname: ChartInputProps['series'] = [];
    let number_series_loaded = 0;

    for(const series of seriesList){
        const name = series.seriesName.value?.toString()!;
        if(series.dataList.status === ValueStatus.Available){
            number_series_loaded += 1;
        }
        seriesname.push({name: name, displayname: name, color: series.columnColor.value?.toString()!, strokeColor: series.strokeColor.value?.toString()!});
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
    //let test = arr[0];
    //let keys = !test ? 0 : Object.keys(test).length;

   if(number_series_loaded === seriesList.length)
     return <Chart props={props} dataJson={arr} series={seriesname} chartHeight={props.heightChart} chartWidth={props.widthChart}/> 

   return <div>Error</div>;
}
