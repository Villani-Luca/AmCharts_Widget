import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { ColumnChartContainerProps } from "../typings/ColumnChartProps";

import "./ui/ColumnChart.css";

export function ColumnChart({ sampleText }: ColumnChartContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
