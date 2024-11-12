import { createElement, ReactElement, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { ColumnChartContainerProps } from 'typings/ColumnChartProps';

export type DataJson = {
    category: string | undefined,
    value: number | undefined
}

export interface ChartInputProps {
    props: ColumnChartContainerProps,
    dataJson: Array<DataJson>,
    chartWidth: number,
    chartHeight: number
}


function Chart({ dataJson, chartHeight, chartWidth, props }: ChartInputProps): ReactElement {
    useLayoutEffect(() => {
        let root = am5.Root.new("chartdiv");
        console.log(dataJson);
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panY: false,
                layout: root.verticalLayout
            })
        );

        // Create Y-axis
        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            })
        );

        // Create X-Axis
        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                renderer: am5xy.AxisRendererX.new(root, {}),
                categoryField: "category"
            })
        );
        xAxis.data.setAll(dataJson);

        // Create series
        let series1 = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Series",
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: "value",
                categoryXField: "category"
            })
        );
        series1.columns.template.events.on("click", function(event){
            const column_clicked = event.target.dataItem?.dataContext as DataJson;
            let i = props.dataList?.items?.find((x)=> props.category?.get(x).value == column_clicked.category)!;
            props.columnClick?.get(i).execute();
        } );
        series1.data.setAll(dataJson);
        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);

        // Add cursor
        chart.set("cursor", am5xy.XYCursor.new(root, {}));

        return () => {
            root.dispose();
        };
    }, []);

    const width = chartWidth.toString() + "px";
    const height = chartHeight.toString() + "px";
    return (
        <div id="chartdiv" style={{ width: width, height: height }}></div>
    );
}
export default Chart;