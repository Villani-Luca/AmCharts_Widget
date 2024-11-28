import { createElement, ReactElement, useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { SeriesChartContainerProps } from 'typings/SeriesChartProps';

export type DataJson = { category: string; } & Record<string, number | string>;

export interface ChartInputProps {
    props: SeriesChartContainerProps,
    series: {
        name: string,
        displayname: string,
        color: string,
        strokeColor: string,
    }[],
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

function setLegendPosition(chart: am5.Chart,inputlegend: am5.Legend ,position: ChartInputProps['props']) {
    // Ensure the chart has a legend
    if (!inputlegend) {
      inputlegend = am5.Legend.new(chart.root, {});
    }
  
    let legend = inputlegend;
  
    // Reset layout and alignment defaults
    legend.setAll({
      layout: chart.root.horizontalLayout, // Default layout
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      x: am5.percent(50),
      y: am5.percent(50),
      position: "absolute",
    });
  
    switch (position.legendPosition) {
      case "UpperCenter":
        legend.setAll({
          y: am5.percent(0),
          x: am5.percent(50),
          centerX: am5.percent(50),
          layout: chart.root.horizontalLayout,
        });
        chart.set("x", 0);
        chart.set("y",0);
        break;
      case "BottomCenter":
        legend.setAll({
          y: am5.percent(100),
          x: am5.percent(50),
          centerX: am5.percent(50),
          layout: chart.root.horizontalLayout,
        });
        break;
      case "MiddleLeft":
        legend.setAll({
          x: am5.percent(0),
          y: am5.percent(50),
          centerY: am5.percent(50),
          layout: chart.root.verticalLayout,
        });
        chart.set("paddingLeft", 100);
        chart.set("x", 0);
        chart.set("y",0);
        break;
      case "MiddleRight":
        legend.setAll({
          x: am5.percent(100),
          y: am5.percent(50),
          centerY: am5.percent(50),
          layout: chart.root.verticalLayout,
        });
        chart.set("paddingRight", 100);
        chart.set("x", 0);
        chart.set("y",0);
        break;
      case "UpperLeft":
        legend.setAll({
          x: am5.percent(0),
          y: am5.percent(0),
          layout: chart.root.horizontalLayout,
        });
        chart.set("paddingLeft", 100);
        chart.set("x", 0);
        chart.set("y",0);
        break;
      case "UpperRight":
        legend.setAll({
          x: am5.percent(100),
          y: am5.percent(0),
          layout: chart.root.horizontalLayout,
        });
        chart.set("paddingRight", 100);
        chart.set("x", 0);
        chart.set("y",0);
        break;
      case "BottomLeft":
        legend.setAll({
          x: am5.percent(0),
          y: am5.percent(100),
          layout: chart.root.horizontalLayout,
        });
        chart.set("paddingLeft", 100);
        break;
      case "BottomRight":
        legend.setAll({
          x: am5.percent(100),
          y: am5.percent(100),
          layout: chart.root.horizontalLayout,
        });
        chart.set("paddingRight", 100);
        
        break;
      default:
        console.warn("Invalid position. Use: UpperCenter, BottomCenter, MiddleLeft, MiddleRight, UpperLeft, UpperRight, BottomLeft, BottomRight.");
    }
    legend.labels.template.setAll({fill: am5.color(position.labelColorX.value?.toString()!)})
    chart.children.push(legend);
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
            pinchZoomX: false,
            layout: root.verticalLayout,

        }));

        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/

        let legend = am5.Legend.new(root, {});
        chart.children.push(legend);



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

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "category",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));



        xRenderer.grid.template.setAll({
            location: 1
        })

        xAxis.data.setAll(dataJson);

        var yRenderer = am5xy.AxisRendererY.new(root, {
            strokeOpacity: 0,
        })
        yRenderer.labels.template.setAll({
            fill: am5.color(props.labelColorY.value?.toString()!),
        });


        // Create Y-axis
        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: yRenderer,
            })
        );



        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(serieInformation: ChartInputProps['series'][number]) {
            const {
                name,
                displayname: fieldName,
                color,
                strokeColor
            } = serieInformation;

            var columnSerie = am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "category",
                tooltip: props.tooltipActivation ? am5.Tooltip.new(root, {
                    labelText: "{valueY}"
                }) : undefined,
                fill: am5.color(color),
                stroke: am5.color(strokeColor)
            });
            let series = chart.series.push(
                columnSerie
            );


            series.columns.template.setAll({
                cornerRadiusTL: 5,
                cornerRadiusTR: 5,
                strokeOpacity: 0,
                shadowOpacity: 0.1,
                shadowOffsetX: 2,
                shadowOffsetY: 2,
                shadowBlur: 1,
                strokeWidth: 2,
                stroke: am5.color(0xffffff),
                shadowColor: am5.color(0x000000),
                cursorOverStyle: "pointer"
            });

            series.columns.template.states.create("hover", {
                shadowOpacity: 1,
                shadowBlur: 10,
                cornerRadiusTL: 5,
                cornerRadiusTR: 5
            })



            series.columns.template.setAll({
                tooltipText: "{name}, {valueY}",
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            });

            let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {behavior: "zoomX"}));
            cursor.lineY.set("visible", false);
            cursor.lineX.set("visible", false);
            
            series.columns.template.events.on("click", function (event) {
                const column_clicked = event.target.dataItem?.dataContext as DataJson;
                const mxseries = props.seriesList.find((x) => x.seriesName.value?.toString() == fieldName);
                const mxobject = mxseries?.dataList.items?.find(x => mxseries.category?.get(x).value?.toString() === column_clicked.category)
                if (!mxobject) {
                    console.error('[SeriesChart] Click object not found');
                    return;
                }

                const onclickhandler = mxseries?.columnClick?.get(mxobject);
                if (onclickhandler?.canExecute || !onclickhandler?.isExecuting) {
                    onclickhandler?.execute();
                }
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
            makeSeries(element)
        });

        setLegendPosition(chart,legend, props);



        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);
        return () => { root.dispose();legend.dispose() };
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

