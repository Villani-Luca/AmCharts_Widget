                 // @ts-nocheck
import { createElement, ReactElement, useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { SeriesChartContainerProps } from 'typings/SeriesChartProps';

export type DataJson = Record<string, number | string>;

export interface ChartInputProps {
    props: SeriesChartContainerProps,
    series: {name: string, displayname: string}[]
    dataJson: Array<DataJson>,
    chartWidth: number,
    chartHeight: number
}
type LabelSettings = {
    rotationLabel: number | undefined,
    alignLabel: alignLabel,
    colorLabel: am5.Color | undefined
}

enum alignLabel {
    start = "start",
    end = "end",
    left = "left",
    center = "center",
    right = "right"
}


function Chart({ dataJson, series, props, chartHeight, chartWidth }: ChartInputProps): ReactElement {
console.log(dataJson);
console.log(series);
    let nameChart = Math.random().toString(36).slice(2);
    useEffect(() => {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new(nameChart);

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            paddingLeft: 0,
            wheelX: "panX",
            wheelY: "zoomX",
            layout: root.verticalLayout
        }));

        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        let legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
            minorGridEnabled: true
        })

        let labelSetting: LabelSettings = { rotationLabel: 0, alignLabel: alignLabel.center, colorLabel: am5.color(props.labelColorX.value?.toString()!) };
        switch (props.labelOrientation) {
            case 'Orizzontal': {
                labelSetting = {
                    rotationLabel: 0,
                    alignLabel: alignLabel.center,
                    colorLabel: am5.color(props.labelColorX.value?.toString()!)
                };
                break;
            }
            case 'Vertical': {
                labelSetting = {
                    rotationLabel: -90,
                    alignLabel: alignLabel.center,
                    colorLabel: am5.color(props.labelColorX.value?.toString()!)
                };
                break;
            }
            default:
                break;
        }

        switch (props.labelAlign) {
            case 'start': {
                labelSetting.alignLabel = alignLabel.start
                break;
            }
            case 'end': {
                labelSetting.alignLabel = alignLabel.end
                break;
            }
            case 'left': {
                labelSetting.alignLabel = alignLabel.left
                break;
            }
            case 'center': {
                labelSetting.alignLabel = alignLabel.center
                break;
            }
            case 'right': {
                labelSetting.alignLabel = alignLabel.right
                break;
            }
            default:
                break;
        }

        xRenderer.labels.template.setAll({
            textAlign: labelSetting.alignLabel,
            fill: labelSetting.colorLabel,
            rotation: labelSetting.rotationLabel
        });
        console.log("xRendere")

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "category",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));
        console.log("xAxis")


        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(dataJson);
        console.log("xsetData")


        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));
        console.log("yAxis")



        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name:string, fieldName:string) {
            let series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "category"
            }));

            series.columns.template.setAll({
                tooltipText: "{name}, {valueY}",
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            });

            series.columns.template.events.on("click", function (event) {
                const column_clicked = event.target.dataItem?.dataContext as DataJson;
                console.info(event);
                console.info(column_clicked);
                console.info(column_clicked[event.target.dataItem?.component.name])
                console.info(props.seriesList.find((x) => x.seriesName.value == column_clicked[event.target.dataItem?.component._settings.name]));
                
                //i.columnClick?.get(i?.dataList.items?.find((x)=> i.category?.get(x).value == ).execute();
            });


            series.data.setAll(dataJson);

            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear();

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: am5.Label.new(root, {
                        text: "{valueY}",
                        fill: am5.color(props.labelColorY.value?.toString()!),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            });

            legend.data.push(series);
        }

        series.forEach(element => {
            makeSeries(element.displayname, element.name)
        });
        

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
        return () => {root.dispose(); legend.dispose()};
    }, []);


    var width: string = chartWidth.toString();
    switch (props.widthDimension) {
        case 'px': {
            width += "px";
            break;
        }
        case 'perc': {
            width += "%";
            break;
        }
        default: {
            break;
        }

    }
    var height: string = chartHeight.toString();
    switch (props.heightDimension) {
        case 'px': {
            height += "px";
            break;
        }
        case 'perc': {
            height += "%";
            break;
        }
        default: {
            break;
        }

    }
    return (
        <div id={nameChart} style={{ width: width, height: height }}></div>
    );
}
export default Chart;

