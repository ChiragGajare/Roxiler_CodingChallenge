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
            className="p-2 my-3">

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
      </div>
    </div>
  );
}

export default App;
