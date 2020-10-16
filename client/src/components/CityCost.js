import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// const data = [
//   { name: "SLC", price: 2400, listPrice: 3400 },
//   { name: "Provo", price: 1400, listPrice: 3400 },
//   { name: "Sandy", price: 5400, listPrice: 3400 },
// ];

const data = [
  { name: "SLC", price: 2400 },
  { name: "Provo", price: 140 },
  { name: "Sandy", price: 5400 },
];

const CityCost = () => {
  const [chartData, setChartData] = useState([]);
  const [counter, setCounter] = useState(0);

  const normalizeData = (data) => {
    // need to return array of objects with name and price
    return data.map((d) => {
      return {
        name: d.city,
        price: getSum(d.prices, d.price),
      };
    });
  };
  const getSum = (prices, price) => {
    return Math.round(
      prices.split(",").reduce((acc, value) => acc + parseInt(value), 0) / price
    );

    // priceArr = prices.split(",");
    // sum = priceArr.reduce((acc, val) => acc + parseInt(val), 0);
    // return Math.round(sum / price);
  };
  useEffect(() => {
    Axios.get("/api/properties/city_cost").then((res) => {
      const normailizedData = normalizeData(res.data);
      setChartData(normailizedData);
      // console.log(normailizedData);
    });
  }, []);

  useEffect(() => {
    console.log("useEffect");
    if (counter > 10) {
      setCounter(0);
    }
  }, [counter]);

  return (
    <div>
      <div onClick={() => setCounter(counter + 1)}>{counter}</div>
      <h1>cost by city</h1>

      <BarChart
        width={600}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#8884d8" />
        {/* <Bar dataKey="listPrice" fill="#1884d8" /> */}
      </BarChart>
    </div>
  );
};

export default CityCost;
