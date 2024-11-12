import { ReactElement, createElement } from "react";
import { ColumnChartPreviewProps } from "../typings/ColumnChartProps";

export function preview({ }: ColumnChartPreviewProps): ReactElement {
    return <div />;
}

export function getPreviewCss(): string {
    return require("./ui/ColumnChart.css");
}
