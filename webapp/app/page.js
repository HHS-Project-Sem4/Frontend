"use client";

import SideBar from "../components/SideBar";
import React, { useState, useEffect } from "react"

import textData from "@/data/textContent";

import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';
import InfoOverlay from "@/components/InfoOverlay";
import DropDown from "@/components/DropDown";
import useDataFetcher from "@/data/useDataFetcher";

ChartJS.register(
  CategoryScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [tab, setTab] = useState(0)
  const [reload, setReload] = useState(0)

  const [products, setProducts] = useState(["Alle Producten", "Shirt", "Sneakers", "Sportschoenen", "Wandelschoenen"])
  const [selectedProduct, setSelectedProduct] = useState(products[0])
  const [loading, setLoading] = useState(true)

  const [startDate, setStartDate] = useState('2015-08-01');

  const [endDate, setEndDate] = useState('2017-01-01')
  const [labels, setLabels] = useState(['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'])

  const [chartData1, setChartData1] = useState()
  const [chartData2, setChartData2] = useState()
  const [chartData3, setChartData3] = useState()
  const [chartData4, setChartData4] = useState()

  const [verkoop, setVerkoop] = useState(0)
  const [kosten, setKosten] = useState(0)
  const [omzet, setOmzet] = useState(0)
  const [brutoWinstmarge, setBrutoWinstmarge] = useState(0)
  const [winst, setWinst] = useState(0)


  useEffect(() => {
    console.log("changed tab to: " + tab);
    useDataFetcher({ setLoading, tab, selectedProduct, startDate, endDate, setChartData1, setChartData2, setChartData3, setChartData4, setVerkoop, setKosten, setOmzet, setBrutoWinstmarge, setWinst })
  }, [tab, reload, startDate, endDate])

  useEffect(() => {
    const monthNamesDutch = [
      'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
      'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
    ];

    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = [];

    let currentDate = start;

    while (currentDate <= end) {
      const monthIndex = currentDate.getMonth();
      const monthName = monthNamesDutch[monthIndex];
      months.push(monthName);

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    if (months.length > 0) {
      setLabels(old => months)
    }
  }, [startDate, endDate])



  let options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      }
    },
  }

  function shortenNumber(number) {
    if (!number) return 0
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(number) / 3);
    const shortNumber = (number / Math.pow(1000, suffixIndex)).toFixed(1);
    return `${shortNumber}${suffixes[suffixIndex]}`;
  }


  function generateRandomArray() {
    const length = Math.floor(Math.random() * 10) + 1; // Random length between 1 and 10
    const result = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
      result.push(randomNumber);
    }
    return result;
  }

  function getTabTitle() {
    return ["VERKOOP", "KOSTEN", "WINST", "PRODUCTEN", "OPSLAG", "KLANTEN", "FILIALEN"][tab]
  }

  return (
    <div className='w-screen h-screen flex'>
      <div className='h-full bg-white w-[275px]'>
        <div>
          <div className='p-4'>
            <h1 className='font-bold text-lg'>OUTDOORFUSION</h1>
            <p className='font-bold text-sm -mt-1.5'>DASHBOARD</p>
          </div>
          <SideBar tab={tab} setTab={setTab} />
        </div>
      </div>

      <div className='h-screen w-full p-4'>
        <div className="flex flex-col gap-6 h-full">
          <div>
            <h2 className="font-bold text-2xl">{["VERKOOP", "KOSTEN", "WINST", "PRODUCTEN", "OPSLAG", "KLANTEN", "FILIALEN"][tab]} OVERZICHT</h2>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center">
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border-2 border-black">
                <input onChange={(e) => setStartDate(e.target.value)} value={startDate} className="w-[120px] focus:outline-none" type="date" />
              </div>
              <p className="px-2">-</p>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border-2 border-black">
                <input onChange={(e) => setEndDate(e.target.value)} value={endDate} className="w-[120px] focus:outline-none" type="date" />
              </div>
            </div>

            <DropDown products={products} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
          </div>

          <div className="flex justify-between w-full">
            <div className="flex flex-col justify-center items-center bg-white rounded-lg border-2 border-black w-2/12 py-4">
              <p className="text-3xl font-bold">{shortenNumber(verkoop)}</p>
              <p className="font-bold text-sm">VERKOCHT</p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white rounded-lg border-2 border-black w-2/12 py-4">
              <p className="text-3xl font-bold">€{shortenNumber(omzet)}</p>
              <p className="font-bold text-sm">OMZET</p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white rounded-lg border-2 border-black w-2/12 py-4">
              <p className="text-3xl font-bold">€{shortenNumber(kosten)}</p>
              <p className="font-bold text-sm">KOSTEN</p>
            </div>


            <div className="flex flex-col justify-center items-center bg-white rounded-lg border-2 border-black w-2/12 py-4">
              <p className="text-3xl font-bold">{brutoWinstmarge}%</p>
              <p className="font-bold text-sm">BRUTO WINSTMARGE</p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white rounded-lg border-2 border-black w-2/12 py-4">
              <p className={"text-3xl font-bold " + (winst > 0 ? "text-green-400" : "text-red-400")}>€{shortenNumber(winst)}</p>
              <p className="font-bold text-sm">WINST</p>
            </div>
          </div>

          <div className="flex flex-col gap-10 h-full">
            <div className="flex justify-between w-full gap-10 h-1/2">
              {chartData1?.data.length != 1 && <div className={"relative bg-white h-full rounded-lg border-2 border-black graphContainer " + (chartData2?.data.length == 1 ? "w-full" : " w-1/2")}>
                <InfoOverlay text={textData[getTabTitle()]?.chart1?.uitleg} />
                <Line options={options} data={{
                  labels: chartData1?.labels,
                  datasets: [
                    {
                      fill: true,
                      label: textData[getTabTitle()]?.chart1?.label,
                      data: chartData1?.data,
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                  ],
                }} />
              </div>}
              {chartData2?.data.length != 1 && <div className={"relative bg-white h-full rounded-lg border-2 border-black graphContainer " + (chartData1?.data.length == 1 ? "w-full" : " w-1/2")}>
                <InfoOverlay text={textData[getTabTitle()]?.chart2?.uitleg} />
                <Pie options={options} data={{
                  labels: chartData2?.labels,
                  datasets: [
                    {
                      label: textData[getTabTitle()]?.chart2?.label,
                      data: chartData2?.data,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }} />
              </div>}
            </div>
            <div className="flex justify-between w-full gap-10 h-1/2">
              {chartData3?.data.length != 1 && <div className={"relative bg-white h-full rounded-lg border-2 border-black graphContainer " + (chartData4?.data == [0] ? "w-full" : "w-1/2")}>
                <InfoOverlay text={textData[getTabTitle()]?.chart3?.uitleg} />

                <Line options={options} data={{
                  labels: chartData3?.labels,
                  datasets: [
                    {
                      label: textData[getTabTitle()]?.chart3?.label,
                      data: chartData3?.data,
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                  ],
                }} />
              </div>}

              <div className={"relative flex items-center justify-center bg-white h-full rounded-lg border-2 border-black graphContainer " + (chartData3?.data.length == 1 ? "w-full" : " w-1/2")}>
                <InfoOverlay text={textData[getTabTitle()]?.chart4?.uitleg} />

                {loading && <div className="flex flex-col items-center justify-center absolute w-1/3 h-1/3 rounded-md z-50">
                  <img className="rotateBOIII" src="/loadingIcon.png" />
                  <p className="font-bold mt-2">Data aan het voorspellen</p>
                </div>}

                <Bar options={options} data={{
                  labels: chartData4?.labels,
                  datasets: [
                    {
                      label: textData[getTabTitle()]?.chart4?.label,
                      data: chartData4?.data,
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                  ],
                }}>
                </Bar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
