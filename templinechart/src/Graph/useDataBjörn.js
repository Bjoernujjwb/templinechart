import React, { useState, useEffect } from "react";
import { csv } from "d3";
import "./Graph.css";
// import { getPopulation, Population } from "./Population";


let zwischenspeicher;

const dateEnde = new Date("2023-01-18"); //dies muss nachher noch global festgelegt und übergeben werden. Zur einfacheren Handhabung lege ich es hier fest.
const dateAnfang = new Date("2022-12-23"); //das gleiche gilt hierfür. Dies ergebt sich aus dem Anfang der Methoden. Also dem Start des Graphen

const csvUrl =
  "https://raw.githubusercontent.com/KITmetricslab/hospitalization-nowcast-hub/main/data-truth/COVID-19/COVID-19_hospitalizations_preprocessed.csv";

export const useDataDatenstand = (
  methode,
  menuAge,
  selectedScope,
  anzeige,
  date
) => {
  const [data, setData] = useState(null);
  const [datesAfterEnde, setDatesAfterEnde] = useState(null);
  const [Datenstand, setDatenstand] = useState(null);

  useEffect(() => {
    const row = (d) => {
  
   for (let i = 0; i <= 80; i++) {
        d[`value_${i}d`] = parseFloat(d[`value_${i}d`]);
      }
      d["value_>80d"] = parseFloat(d["value_>80d"]);
      d.date = new Date(d.date);

      d.value = Object.values(d).reduce((total, value) => {
        return total + (typeof value === 'number' ? value : 0);
      }, 0);

      return d;
    };

    csv(csvUrl, row).then((loadedData) => {
      const filteredData = loadedData.filter(
        (d) => d.location === selectedScope && d.age_group === menuAge
      );
      setData(filteredData);

      const dateEndePosition = filteredData.findIndex(
        (d) => d.date.getTime() === dateEnde.getTime()
      );
      const datesAfterEnde = filteredData.slice(dateEndePosition + 1).length;
      setDatesAfterEnde(datesAfterEnde);
    });
  }, [methode, menuAge, selectedScope, anzeige]);

  // console.log(data);
  return data;
};


// export const useCSVData = ( methode,
//     menuAge,
//     selectedScope,
//     anzeige,
//     date) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const row = (d) => {
//       for (let i = 0; i <= 80; i++) {
//         d[`value_${i}d`] = parseFloat(d[`value_${i}d`]);
//       }
//       d["value_>80d"] = parseFloat(d["value_>80d"]);
//       d.date = new Date(d.date);
//       return d;
//     };

//     csv(csvUrl, row).then((loadedData) => {
//       const filteredData = loadedData.filter(
//         (d) => d.location === selectedScope && d.age_group === menuAge
//       );
//       setData(filteredData);
//     });
//   }, []);

//   return data;
// };


// export const useDataDatenstand = (data) => {
//   const [datesAfterEnde, setDatesAfterEnde] = useState(null);
//   const [Datenstand, setDatenstand] = useState(null);
//     useEffect(() => {
//     if (data) {
//       const dateEndePosition = data.findIndex(
//         (d) => d.date.getTime() === dateEnde.getTime()
//       );
//       const datesAfterEnde = data.slice(dateEndePosition + 1).length;
//       setDatesAfterEnde(datesAfterEnde);
//     }
//   }, [data]);

//   return datesAfterEnde;
// };