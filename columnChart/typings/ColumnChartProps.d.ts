/**
 * This file was generated from ColumnChart.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface ColumnChartContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataList?: ListValue;
    category?: ListAttributeValue<string>;
    value?: ListAttributeValue<Big>;
    widthChart: number;
    heightChart: number;
    columnClick?: ActionValue;
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
    widthChart: number | null;
    heightChart: number | null;
    columnClick: {} | null;
}
