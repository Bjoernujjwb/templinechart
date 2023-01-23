import React, { useEffect, useState, useCallback } from "react";
import { scaleLinear, scaleTime, timeFormat, min, max, tickStep } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import "./Graph.css";
import { line, curveNatural } from "d3";
import { MarksRealData } from "./MarksRealData";

const height = 500;
const margin = { top: 20, right: 10, bottom: 65, left: 100 };
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

//_______________________________________________________

export const Graph = ({
  isVisible,
  isDatenstand,
  isEpiforecast,
  isILM,
  isKIT,
  isLMU,
  isNowcast,
  isRIVM,
  isRKI,
  isSU,
  isSZ,
  data,
  EPIdata,
  ILMdata,
  KITdata,
  LMUdata,
  Nowcastdata,
  RIVMdata,
  RKIdata,
  SUdata,
  SZdata,
  datenstand_schwarz,
}) => {
  let width = 800;

  let anzeigeDatenstand;

  let anzeigeEpiforecast;
  let anzeigeILM;
  let anzeigeKIT;
  let anzeigeLMU;
  let anzeigeNowcast;
  let anzeigeRIVM;
  let anzeigeRKI;
  let anzeigeSU;
  let anzeigeSZ;

  if (isVisible === true) {
    width = 750;
  } else {
    width = 1100;
  }

  if (isEpiforecast) {
    anzeigeDatenstand = "visible";
  } else {
    anzeigeDatenstand = "hidden";
  }

  if (isDatenstand) {
    anzeigeEpiforecast = "visible";
  } else {
    anzeigeEpiforecast = "hidden";
  }

  if (isILM) {
    anzeigeILM = "visible";
  } else {
    anzeigeILM = "hidden";
  }

  if (isKIT) {
    anzeigeKIT = "visible";
  } else {
    anzeigeKIT = "hidden";
  }

  if (isLMU) {
    anzeigeLMU = "visible";
  } else {
    anzeigeLMU = "hidden";
  }

  if (isNowcast) {
    anzeigeNowcast = "visible";
  } else {
    anzeigeNowcast = "hidden";
  }

  if (isRIVM) {
    anzeigeRIVM = "visible";
  } else {
    anzeigeRIVM = "hidden";
  }

  if (isRKI) {
    anzeigeRKI = "visible";
  } else {
    anzeigeRKI = "hidden";
  }

  if (isSU) {
    anzeigeSU = "visible";
  } else {
    anzeigeSU = "hidden";
  }

  if (isSZ) {
    anzeigeSZ = "visible";
  } else {
    anzeigeSZ = "hidden";
  }

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  //please change

  const xValue = (d) => d.date;
  const xAxisLabel = "Meldedatum";

  const yValue = (d) => d.value;
  const yQuantileKlein = (d) => d.quantileKlein;
  const yQuantileGroß = (d) => d.quantileGroß;
  const yAxisLabel = "7 Tage Hospitalisierungsinzidenz";

  const xAxisTickFormat = timeFormat("%d.%m.%Y");

  const xScale = scaleTime()
    .domain([min(data, xValue), max(data, xValue)])
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain([0, max(data, yQuantileGroß)])
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight + 10}
          tickFormat={xAxisTickFormat}
          tickOffset={10}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset - 25},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={10} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset + 10}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <g className="mark">
          <Marks
            data={EPIdata}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            yQuantileKlein={yQuantileKlein}
            yQuantileGroß={yQuantileGroß}
            circleRadius={3}
            anzeigeAnAus={anzeigeEpiforecast}
            farbe={"red"}
          />

          <Marks
            data={ILMdata}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            yQuantileKlein={yQuantileKlein}
            yQuantileGroß={yQuantileGroß}
            circleRadius={3}
            anzeigeAnAus={anzeigeILM}
            farbe={"0,0,255"}
          />

          <Marks
            data={KITdata}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            yQuantileKlein={yQuantileKlein}
            yQuantileGroß={yQuantileGroß}
            circleRadius={3}
            anzeigeAnAus={anzeigeKIT}
            farbe={"100,0,250"}
          />
          <Marks
            data={LMUdata}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            yQuantileKlein={yQuantileKlein}
            yQuantileGroß={yQuantileGroß}
            circleRadius={3}
            anzeigeAnAus={anzeigeLMU}
            farbe={"400,10,200"}
          />
          <Marks
            data={Nowcastdata}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            yQuantileKlein={yQuantileKlein}
            yQuantileGroß={yQuantileGroß}
            circleRadius={3}
            anzeigeAnAus={anzeigeNowcast}
            farbe={"100,049,0"}
          />

          <Marks
            data={RIVMdata}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            yQuantileKlein={yQuantileKlein}
            yQuantileGroß={yQuantileGroß}
            circleRadius={3}
            anzeigeAnAus={anzeigeRIVM}
            farbe={"600,100,200"}
          />
          <Marks
            data={RKIdata}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            yQuantileKlein={yQuantileKlein}
            yQuantileGroß={yQuantileGroß}
            circleRadius={3}
            anzeigeAnAus={anzeigeRKI}
            farbe={"100,100,100"}
          />
          <Marks
            data={SUdata}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            yQuantileKlein={yQuantileKlein}
            yQuantileGroß={yQuantileGroß}
            circleRadius={3}
            anzeigeAnAus={anzeigeSU}
            farbe={"010,200,222"}
          />
          <Marks
            data={SZdata}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            yQuantileKlein={yQuantileKlein}
            yQuantileGroß={yQuantileGroß}
            circleRadius={3}
            anzeigeAnAus={anzeigeSZ}
            farbe={"0,200,100"}
          />
          <MarksRealData
            data={datenstand_schwarz}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            circleRadius={3}
            farbe={"0,200,100"}
          /> 
        </g>
      </g>
    </svg>
  );
};
