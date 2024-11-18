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
function maybeDisposeRoot(divId:string) {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root.dom.id == divId) {
        root.dispose();
      }
    });
  };

function Chart({ dataJson, chartHeight, chartWidth, props }: ChartInputProps): ReactElement {
    useLayoutEffect(() => {

        maybeDisposeRoot("chartdiv");
        
        let root = am5.Root.new("chartdiv");
        console.log(dataJson);
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                pinchZoomX: true,
                paddingLeft: 0,
                paddingRight: 1,
                layout: root.verticalLayout
            })
        );


        //########## ASSE Y DEFINIZIONE ##########
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



        //########## ASSE X DEFINIZIONE ##########

        //creating xRenderer and setting up the template information
        var xRenderer = am5xy.AxisRendererX.new(root, {
            strokeOpacity: 0,
        });

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

        // Create X-Axis
        let xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                renderer: xRenderer,
                categoryField: "category"
            })
        );
        xAxis.data.setAll(dataJson);


        var columnSerie = props.tooltipActivation ? am5xy.ColumnSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            categoryXField: "category",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            }),
            fill: am5.color(props.columnColor.value?.toString()!),
            stroke: am5.color(props.strokeColor.value?.toString()!)
        }) : am5xy.ColumnSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            categoryXField: "category",
            fill: am5.color(props.columnColor.value?.toString()!),
            stroke: am5.color(props.strokeColor.value?.toString()!)
        });
        // Create series
        let series = chart.series.push(
            columnSerie
        );


        series.columns.template.setAll({
            cornerRadiusTL: 25,
            cornerRadiusTR: 25,
            strokeOpacity: 0,
            shadowOpacity: 0.1,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
            shadowBlur: 1,
            strokeWidth: 2,
            stroke: am5.color(0xffffff),
            shadowColor: am5.color(0x000000)
        });

        series.columns.template.states.create("hover", {
            shadowOpacity: 1,
            shadowBlur: 10,
            cornerRadiusTL: 5,
            cornerRadiusTR: 5
          })

        series.columns.template.events.on("click", function (event) {
            const column_clicked = event.target.dataItem?.dataContext as DataJson;
            let i = props.dataList?.items?.find((x) => props.category?.get(x).value == column_clicked.category)!;
            props.columnClick?.get(i).execute();
        });
        series.data.setAll(dataJson);
        // Add legend
        // let legend = chart.children.push(am5.Legend.new(root, {}));
        // legend.data.setAll(chart.series.values);


        // Add cursor
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);
        cursor.lineX.set("visible", false);

        return () => {
            root.dispose();
        };
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
        <div id="chartdiv" style={{ width: width, height: height }}></div>
    );
}
export default Chart;