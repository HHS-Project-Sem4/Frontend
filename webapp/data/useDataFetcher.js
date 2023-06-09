import React from 'react'

let baseURL = "https://api-sem4.azurewebsites.net"
const useDataFetcher = async ({ setLoading, tab, selectedProduct, startDate, endDate, setChartData1, setChartData2, setChartData3, setChartData4, setVerkoop, setKosten, setOmzet, setBrutoWinstmarge, setWinst }) => {

    let productData = await fetch(`${baseURL}/Sales/date/${startDate}X${endDate}`).then(async res => await res.json())
    let vooraadData = await fetch(`${baseURL}/Voorraad`).then(async res => await res.json())
    let productenData = await fetch(`${baseURL}/Product`).then(async res => await res.json())

    const transformedObject = productenData.reduce((result, item) => {
        result[item.productId] = { costs: item.productionCost };
        return result;
    }, {});


    let kosten = 0;
    productData.map(p => {
        kosten += p.orderQuantity * transformedObject[p.productId].costs
    })
    setKosten(kosten)

    let groupedProducts = productData.reduce((acc, product) => {
        const date = new Date(product.day);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        const key = `${year}-${month}`;
        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(product);

        return acc;
    }, {});

    let sortedGroupedProducts = Object.entries(groupedProducts).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

    // console.log(productData);


    //SET GLOBAL STATES
    const TotaalVerkocht = Object.values(sortedGroupedProducts).map((products) => {
        let count = 0
        products.map(product => count += product.orderQuantity)
        return count
    });

    setVerkoop(TotaalVerkocht.reduce((acc, value) => acc + value, 0))

    const TotaalOmzet = Object.values(sortedGroupedProducts).map((products) => {
        let count = 0
        products.map(product => count += product.unitPrice * product.orderQuantity)
        return count
    });

    let omzet = TotaalOmzet.reduce((acc, value) => acc + value, 0)
    setOmzet(omzet)

    let winst = TotaalOmzet.reduce((acc, value) => acc + value, 0) - kosten
    setWinst(winst)

    setBrutoWinstmarge(((kosten / omzet) * 100).toFixed(2))

    // console.log(sum);


    const labels = Object.keys(sortedGroupedProducts).map((key) => formatYearMonth(key));

    setChartData1({ labels: ["DATA VERWERKEN"], data: [0] })
    setChartData2({ labels: ["DATA VERWERKEN"], data: [0] })
    setChartData3({ labels: ["DATA VERWERKEN"], data: [0] })
    setChartData4({ labels: ["DATA VOORSPELLEN"], data: [0] })

    if (tab == 0) {
        console.log(tab);
        console.log(startDate);
        console.log(endDate);

        //fetch alle producten data


        //CHART 1 START - VERKOCHTE PRODUCTEN


        const d = Object.values(sortedGroupedProducts).map((products) => {
            let count = 0
            products.map(product => count += product.orderQuantity)
            return count
        });

        let endData = { labels, data: d };
        console.log(endData);

        setChartData1(endData)
        //CHART 1 END - VERKOCHTE PRODUCTEN

        //CHART 2 WIP - GROEIPERCENTAGE
        setChartData2({ labels: ["GEEN DATA"], data: [1] })
        //CHART 2 WIP - GROEIPERCENTAGE

        //CHART 3 START - GROEIPERCENTAGE
        const growthPercentages = endData.data.map((value, index) => {
            if (index === 0) {
                return 0; // No growth percentage for the first month
            }

            const previousValue = endData.data[index - 1];
            const percentage = ((value - previousValue) / previousValue) * 100;
            return percentage.toFixed(2);
        });

        setChartData3({ labels, data: growthPercentages })
        //CHART 3 END - GROEIPERCENTAGE

        //CHART 4 START - UNIT COSTS PREDICTION

        setLoading(true)
        await fetch(`https://outdoorfusionpython.azurewebsites.net/predict/orderquantity`, {
            method: 'POST',
            cache: "force-cache",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Country: '', Product: '', Category: '', SubCategory: '' })
        }).then(response => response.json()).then(data => {
            setLoading(false)
            console.log(data);
            tab == 0 && setChartData4({ labels: generateUpcomingMonths(endDate), data: Object.values(data) })
        })
        //CHART 4 END - UNIT COSTS PREDICTION


    } else if (tab == 1) {
        console.log(groupedProducts);
        //CHART 1 START - KOSTEN TOTAAL
        const finalArray = Object.entries(groupedProducts).map(([key, products]) => {
            const sum = products.reduce((acc, product) => acc + product.orderQuantity * product.unitPrice, 0);
            return sum;
        });

        setChartData1({ labels, data: finalArray })
        //CHART 1 END - KOSTEN TOTAAL

        //CHART 2 WIP - KOSTEN TOTAAL
        setChartData2({ labels: ["GEEN DATA"], data: [1] })



        //CHART 3 START - KOSTEN GROEIPERCENTAGE
        const growthPercentages = finalArray.map((value, index) => {
            if (index === 0) {
                return 0; // No growth percentage for the first month
            }

            const previousValue = finalArray[index - 1];
            const percentage = ((value - previousValue) / previousValue) * 100;
            return percentage.toFixed(2);
        });

        setChartData3({ labels, data: growthPercentages })


        //CHART 4 START - UNIT COSTS PREDICTION
        setLoading(true)
        await fetch(`https://outdoorfusionpython.azurewebsites.net/predict/unitprice`, {
            method: 'POST',
            cache: "force-cache",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Country: '', Product: '', Category: '', SubCategory: '' })
        }).then(response => response.json()).then(data => {
            console.log(data);
            setLoading(false)
            tab == 1 && setChartData4({ labels: generateUpcomingMonths(endDate), data: Object.values(data) })
        })
        //CHART 4 END - UNIT COSTS PREDICTION




    } else if (tab == 2) {


    } else if (tab == 4) {
        let totalProducts = 0
        const filteredData = vooraadData.filter(item => item.quantity !== 0);
        let labels = []
        let quanitity = []
        setLoading(false)
        filteredData.map(async productInfo => {
            // console.log(productInfo);
            await fetch(`https://localhost:7225/Product/${productInfo.id}`).then(res => res.json()).then(data => {
                // console.log(data);
                labels = [...labels, data.name]
                quanitity = [...quanitity, data.storageQuantity]
                totalProducts += data.storageQuantity
                tab == 4 && setChartData1({labels: [0, `${endDate}`], data: [0, totalProducts]})

                tab == 4 && setChartData4({ labels: labels, data: quanitity })
            })
        })
    } else if (tab == 5) {

    }

}

function formatYearMonth(dateString) {
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1, 1);
    const monthName = date.toLocaleString('default', { month: 'short' });
    return `${year} ${monthName}`;
}

function generateUpcomingMonths(startDate) {
    const months = [];
    const currentDate = new Date(startDate);

    for (let i = 1; i < 13; i++) {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
        const monthName = nextMonth.toLocaleString('default', { year: 'numeric', month: 'short' });
        months.push(monthName);
    }

    return months;
}



export default useDataFetcher