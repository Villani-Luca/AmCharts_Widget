/**
 * This file was generated from ColumnChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, ListValue, ListActionValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type WidthDimensionEnum = "px" | "perc";

export type HeightDimensionEnum = "px" | "perc";

export type LabelOrientationEnum = "Orizzontal" | "Vertical";

export type LabelAlignEnum = "start" | "end" | "left" | "center" | "right";

export interface ColumnChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataList?: ListValue;
    category?: ListAttributeValue<string>;
    value?: ListAttributeValue<Big>;
    widthDimension: WidthDimensionEnum;
    widthChart: number;
    heightDimension: HeightDimensionEnum;
    heightChart: number;
    columnColor: DynamicValue<string>;
    strokeColor: DynamicValue<string>;
    labelColor: DynamicValue<string>;
    labelOrientation: LabelOrientationEnum;
    labelAlign: LabelAlignEnum;
    tooltipActivation: boolean;
    columnClick?: ListActionValue;
}

export interface ColumnChartPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    dataList: {} | { caption: string } | { type: string } | null;
    category: string;
    value: string;
    widthDimension: WidthDimensionEnum;
    widthChart: number | null;
    heightDimension: HeightDimensionEnum;
    heightChart: number | null;
    columnColor: string;
    strokeColor: string;
    labelColor: string;
    labelOrientation: LabelOrientationEnum;
    labelAlign: LabelAlignEnum;
    tooltipActivation: boolean;
    columnClick: {} | null;
}
