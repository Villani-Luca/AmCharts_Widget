import { ReactElement, createElement } from "react";
import { HorizzontalColumnChartPreviewProps } from "../typings/HorizzontalColumnChartProps";

export function preview({ }: HorizzontalColumnChartPreviewProps): ReactElement {
    return <div />;
}

export function getPreviewCss(): string {
    return require("./ui/HorizzontalColumnChart.css");
}
