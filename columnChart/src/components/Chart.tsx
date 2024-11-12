import { createElement, ReactElement, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export type DataJson ={
    category: string | undefined,
    value: number | undefined
}

export interface ChartInputProps {
    dataJson: Array<DataJson>,
    chartWidth: number,
    chartHeight: number
}
function Chart({dataJson}:ChartInputProps):ReactElement {
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
  
    return (
      <div id="chartdiv" style={{ width: "500px", height: "500px" }}></div>
    );
  }
export default Chart;