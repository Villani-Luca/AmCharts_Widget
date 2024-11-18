/**
 * This file was generated from SeriesChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, ListValue, ListActionValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface SeriesListType {
    dataList: ListValue;
    category?: ListAttributeValue<string>;
    value?: ListAttributeValue<Big>;
    seriesName: DynamicValue<string>;
}

export type WidthDimensionEnum = "px" | "perc";

export type HeightDimensionEnum = "px" | "perc";

export type LabelOrientationEnum = "Orizzontal" | "Vertical";

export type LabelAlignEnum = "start" | "end" | "left" | "center" | "right";

export interface SeriesListPreviewType {
    dataList: {} | { caption: string } | { type: string } | null;
    category: string;
    value: string;
    seriesName: string;
}

export interface SeriesChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    seriesList: SeriesListType[];
    nameChart: string;
    widthDimension: WidthDimensionEnum;
    widthChart: number;
    heightDimension: HeightDimensionEnum;
    heightChart: number;
    columnColor: DynamicValue<string>;
    strokeColor: DynamicValue<string>;
    labelColorX: DynamicValue<string>;
    labelColorY: DynamicValue<string>;
    labelOrientation: LabelOrientationEnum;
    labelAlign: LabelAlignEnum;
    tooltipActivation: boolean;
    columnClick?: ListActionValue;
}

export interface SeriesChartPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    seriesList: SeriesListPreviewType[];
    nameChart: string;
    widthDimension: WidthDimensionEnum;
    widthChart: number | null;
    heightDimension: HeightDimensionEnum;
    heightChart: number | null;
    columnColor: string;
    strokeColor: string;
    labelColorX: string;
    labelColorY: string;
    labelOrientation: LabelOrientationEnum;
    labelAlign: LabelAlignEnum;
    tooltipActivation: boolean;
    columnClick: {} | null;
}