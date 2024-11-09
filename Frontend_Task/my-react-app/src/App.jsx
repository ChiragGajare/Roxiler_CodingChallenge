import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DataTable from "react-data-table-component";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/transactions")
      .then((response) => {
        setData(response.data);
      })
      //.then(response=>console.log(response.data))
      .catch((err) => console.log(err));
  }, []);

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

  // for filter searching

  const [records, setRecords] = useState(data);

  function handleFilter(event) {}

  return (
    <div className="container">
      <h1 className="my-3">Transaction Dashboard</h1>
      <br />

      <div className="form-floating my-3 mx-3 w-25">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={handleFilter}
        />
        <label className="form-label">Search</label>
      </div>

 
      <div className="container rounded">
        <DataTable
          columns={columns}
          selectableRows
          fixedHeader
          highlightOnHover
          striped
          data={data}
          pagination
        ></DataTable>
      </div>
    </div>
  );
}

export default App;
