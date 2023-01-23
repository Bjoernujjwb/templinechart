import React, { useState, useEffect } from "react";
import { csv } from "d3";
import "./Graph.css";
import { getPopulation, Population } from "./Population"

const datum = "2023-01-10";

// const csvUrl =
//   "https://raw.githubusercontent.com/KITmetricslab/hospitalization-nowcast-hub/main/nowcast_viz_de/plot_data/" +
//   datum +
//   "_forecast_data.csv";

  const csvUrl = "https://raw.githubusercontent.com/KITmetricslab/hospitalization-nowcast-hub/main/nowcast_viz_de/plot_data/2023-01-20_forecast_data.csv";

export const useData = (
  methode,
  menuAge,
  selectedScope,
  intervall,
  anzeige,
  date
) => {

  let unteresQuantile;
  let oberesQuantile;

// console.log(methode + " " +selectedScope + " " + menuAge + " " + intervall + " " + " " + anzeige + " " + date);


  const [data, setData] = useState(null);

  useEffect(() => {
    if (intervall === "FÜNFZIG") {
      unteresQuantile = "q0.25";
      oberesQuantile = "q0.75";
    } else if (intervall === "FÜNFundNEUNZIG") {
      unteresQuantile = "q0.025";
      oberesQuantile = "q0.975";
    } else {
      unteresQuantile = "mean";
      oberesQuantile = "mean";
    }

    const row = (d) => {
  
      if (anzeige === "hunderttausend") {
        d.value = +d.mean
        d.quantileKlein = +[unteresQuantile]
        d.quantileGroß = +d[oberesQuantile]
      } else {
        d.value = +d.mean;
        d.quantileKlein = +d[unteresQuantile];
        d.quantileGroß = +d[oberesQuantile];
      }

      d.date = new Date(d.target_end_date);

      return d;
    }; 

    csv(csvUrl, row).then((loadedData) => {
      const filteredData = loadedData.filter(
        (d) =>
          d.model === methode &&
          d.location ===  selectedScope &&
          d.age_group === menuAge
  
      );
      setData(filteredData);
    });
  }, [methode, menuAge, selectedScope, intervall, anzeige]);

  return data;
};