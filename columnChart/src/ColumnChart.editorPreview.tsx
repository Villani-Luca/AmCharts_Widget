import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { ColumnChartPreviewProps } from "../typings/ColumnChartProps";

export function preview({ sampleText }: ColumnChartPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/ColumnChart.css");
}
