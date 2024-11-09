import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import DataTable from "react-data-table-component";

function App() {
  // const [trans, setTrans] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/transactions")
      // .then((trans) => setTrans(trans.data))
      .then((response) => {setData(response.data)})
      //.then(trans=>console.log(trans.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
  ];

  return (
    <>
      {/* <div className='container'>
        <h1>React app</h1>
        <table className='table'border={1}>
          <thead>
            <tr>
              <th>
                Title
              </th>
              <th>
                Description
              </th>
              <th>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {trans.map(trans=>{
              return(
              <tr>
                <td>{trans.title}</td>
                <td>{trans.description}</td>
                <td>{trans.price}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div> */}

      <DataTable columns={columns} data={data} pagination>
          
      </DataTable>
    </>
  );
}

export default App;
