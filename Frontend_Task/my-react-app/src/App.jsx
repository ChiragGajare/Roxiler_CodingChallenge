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

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: '2%',
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: '15%',
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: '18%',


    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      grow: 'false',
      width: '15%',
    },
  ];

  return (
    <div className="container">
      <div className="container mt-5 border">
        <DataTable columns={columns} showGridlines data={data} pagination ></DataTable>
      </div>
    </div>
  );
}

export default App;
