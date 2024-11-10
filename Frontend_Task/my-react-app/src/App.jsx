import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DataTable from "react-data-table-component";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/transactions")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data); // Initially, set filtered data to all data
      })
      .catch((err) => console.log(err));
  }, []);

  // searchig and filtering code here....
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the data based on the search query
    const filtered = data.filter((item) => {
      // Check if the title, description, or ID contains the search query
      return (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toString().includes(query)
      );
    });

    // Update the filtered data
    setFilteredData(filtered);
  };

  // Filter data by selected month
  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);

    if (month === "") {
      setFilteredData(data);
    } else {
      const monthIndex = months.indexOf(month);
      const filtered = data.filter((item) => {
        const saleDate = new Date(item.dateOfSale);
        return saleDate.getMonth() === monthIndex;
      });
      setFilteredData(filtered);
    }
  };



  //Statistics code.......
  const [totalSales, setTotalSales] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalUnsoldItems, setTotalUnsoldItems] = useState(0);

  const calculateTotals = (data) => {
    let totalSales = 0;
    let soldItems = 0;
    let unsoldItems = 0;

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      totalSales += item.price;
      soldItems += item.sold ? 1 : 0;
      unsoldItems += !item.sold ? 1 : 0;
    }

    setTotalSales(totalSales);
    setTotalSoldItems(soldItems);
    setTotalUnsoldItems(unsoldItems);
  };

  useEffect(() => {
    calculateTotals(filteredData);
  }, [filteredData]);



  
  // making a table using react-data-table

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "2%",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "14.5%",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "17%",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      width: "15%",
    },
  ];

  return (
    <div className="container">
      <h1 className="my-3">Transaction Dashboard</h1>
      <br />
      <div className="container">
        <div className="">
          <div className="form-floating my-3 mx-3">
            <input
              type="text"
              className="form-control form-control border-secondary"
              placeholder="Search Products"
              value={searchQuery}
              onChange={handleSearch}
            />
            <label className="form-label">Search Products 🔍</label>
          </div>

          <div className="">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="p-2 my-3"
            >
              <option value="">All Months</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="container ">
          <h2 className="my-3">Transactions Table</h2>

          <DataTable
            className="border-dark rounded"
            columns={columns}
            data={filteredData}
            selectableRows
            fixedHeader
            highlightOnHover
            striped
            pagination
          ></DataTable>
        </div>

        <div className="container border-dark my-4">
          <h2 className="my-4">Transactions Statistics</h2>
          {/* Display calculated totals */}
          <p>Total Sales: &#8377; {totalSales.toFixed(2)}</p>
          <p>Total Sold Items: {totalSoldItems}</p>
          <p>Total Unsold Items: {totalUnsoldItems}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
