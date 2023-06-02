"use client";

import SideBar from "../components/SideBar";
import React, { useState, useEffect } from "react"

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

  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [labels, setLabels] = useState(['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'])

  useEffect(() => {
    console.log("changed tab to: " + tab);
  }, [tab, reload])

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

    console.log(months);

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

  Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  });

  function generateRandomArray() {
    const length = Math.floor(Math.random() * 10) + 1; // Random length between 1 and 10
    const result = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
      result.push(randomNumber);
    }
    return result;
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
                <input onChange={(e) => setStartDate(e.target.value)} className="w-[120px] focus:outline-none" type="date" />
              </div>
              <p className="px-2">-</p>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border-2 border-black">
                <input onChange={(e) => setEndDate(e.target.value)} className="w-[120px] focus:outline-none" type="date" defaultValue={new Date().toDateInputValue()} />
              </div>
            </div>

            <DropDown products={products} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
          </div>

          <div className="flex justify-between w-full">
            <div className="flex flex-col justify-center items-center bg-white rounded-lg border-2 border-black w-2/12 py-4">
              <p className="text-3xl font-bold">8929</p>
              <p className="font-bold text-sm">VERKOCHT</p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white rounded-lg border-2 border-black w-2/12 py-4">
              <p className="text-3xl font-bold text-green-400">7,23%</p>
              <p className="font-bold text-sm">GROEIPERCENTAGE</p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white rounded-lg border-2 border-black w-2/12 py-4">
              <p className="text-3xl font-bold">€312392,39</p>
              <p className="font-bold text-sm">OMZET</p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white rounded-lg border-2 border-black w-2/12 py-4">
              <p className="text-3xl font-bold">39,97%</p>
              <p className="font-bold text-sm">BRUTO WINSTMARGE</p>
            </div>

            <div className="flex flex-col justify-center items-center bg-white rounded-lg border-2 border-black w-2/12 py-4">
              <p className="text-3xl font-bold text-green-400">€124859,20</p>
              <p className="font-bold text-sm">WINST</p>
            </div>
          </div>

          <div className="flex flex-col gap-10 h-full">
            <div className="flex justify-between w-full gap-10 h-1/2">
              <div className="w-1/2 relative bg-white h-full rounded-lg border-2 border-black graphContainer">
                <InfoOverlay text={"Hier geven we uitleg over de grafiek die je ziet."} />

                <Bar options={options} data={{
                  labels,
                  datasets: [
                    {
                      label: 'Dataset 1',
                      data: labels.map(() => Math.floor(Math.random() * 1000)),
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                  ],
                }} />
              </div>
              <div className="w-1/2 relative bg-white h-full rounded-lg border-2 border-black graphContainer">
                <InfoOverlay text={"Hier geven we uitleg over de grafiek die je ziet."} />
                <Line options={options} data={{
                  labels,
                  datasets: [
                    {
                      fill: true,
                      label: 'Dataset 2',
                      data: labels.map(() => Math.floor(Math.random() * 1000)),
                      borderColor: 'rgb(53, 162, 235)',
                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                  ],
                }} />
              </div>
            </div>
            <div className="flex justify-between w-full gap-10 h-1/2">
              <div className="w-1/2 relative bg-white h-full rounded-lg border-2 border-black graphContainer">
                <InfoOverlay text={"Hier geven we uitleg over de grafiek die je ziet."} />
                <Pie options={options} data={{
                  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                  datasets: [
                    {
                      label: '# of Votes',
                      data: generateRandomArray(),
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
              </div>
              <div className="w-1/2 relative bg-white h-full rounded-lg border-2 border-black graphContainer">
                <InfoOverlay text={"Hier geven we uitleg over de grafiek die je ziet."} />
                <Radar options={options} data={{
                  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
                  datasets: [
                    {
                      label: '# of Votes',
                      data: generateRandomArray(),
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1,
                    },
                  ],
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
