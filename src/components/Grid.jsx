import React from "react";
import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-balham.css";


const columnDefs = [
  {
    headerName: "ID",
    field: "id",
    width: 70
  },
  {
    headerName: "Athlete",
    field: "athlete",
    width: 150,
    editable: true
  },
  {
    headerName: "Age",
    field: "age",
    width: 90,
    minWidth: 50,
    maxWidth: 100,
    editable: true
  },
  {
    headerName: "Country",
    field: "country",
    width: 120
  },
  {
    headerName: "Year",
    field: "year",
    width: 90
  },
  {
    headerName: "Date",
    field: "date",
    width: 110
  },
  {
    headerName: "Sport",
    field: "sport",
    width: 110
  },
  {
    headerName: "Gold",
    field: "gold",
    width: 100
  },
  {
    headerName: "Silver",
    field: "silver",
    width: 100
  },
  {
    headerName: "Bronze",
    field: "bronze",
    width: 100
  },
  {
    headerName: "Total",
    field: "total",
    width: 100
  }
];


const data = [{
    "athlete": "Michael Phelps",
    "age": 23,
    "country": "United States",
    "year": 2008,
    "date": "24/08/2008",
    "sport": "Swimming",
    "gold": 8,
    "silver": 0,
    "bronze": 0,
    "total": 8
  },
  {
    "athlete": "Michael Phelps",
    "age": 19,
    "country": "United States",
    "year": 2004,
    "date": "29/08/2004",
    "sport": "Swimming",
    "gold": 6,
    "silver": 0,
    "bronze": 2,
    "total": 8
  },
  {
    "athlete": "Michael Phelps",
    "age": 27,
    "country": "United States",
    "year": 2012,
    "date": "12/08/2012",
    "sport": "Swimming",
    "gold": 4,
    "silver": 2,
    "bronze": 0,
    "total": 6
  },
  {
    "athlete": "Natalie Coughlin",
    "age": 25,
    "country": "United States",
    "year": 2008,
    "date": "24/08/2008",
    "sport": "Swimming",
    "gold": 1,
    "silver": 2,
    "bronze": 3,
    "total": 6
  },
  {
    "athlete": "Aleksey Nemov",
    "age": 24,
    "country": "Russia",
    "year": 2000,
    "date": "01/10/2000",
    "sport": "Gymnastics",
    "gold": 2,
    "silver": 1,
    "bronze": 3,
    "total": 6
  },
  {
    "athlete": "Alicia Coutts",
    "age": 24,
    "country": "Australia",
    "year": 2012,
    "date": "12/08/2012",
    "sport": "Swimming",
    "gold": 1,
    "silver": 3,
    "bronze": 1,
    "total": 5
  },
  {
    "athlete": "Missy Franklin",
    "age": 17,
    "country": "United States",
    "year": 2012,
    "date": "12/08/2012",
    "sport": "Swimming",
    "gold": 4,
    "silver": 0,
    "bronze": 1,
    "total": 5
  },
]

function Grid() {
  const [rowData, setRowData] = React.useState([]);
  const apiRef = React.useRef({
    grid: undefined,
    column: undefined
  });
  const onGridReady = (params) => {
    apiRef.current.grid = params.api;
    apiRef.current.column = params.columnApi;
  };

  React.useEffect(() => {
    // fetchData().then((d) => setRowData(d));
    // fetchLargeData().then((d) => setRowData(d));
    setRowData(data)
  }, []);

  console.log('rowData', rowData)

  return (
    <div >
      <div
        style={{ height: "100%", width: "100%" }}
        className="ag-theme-balham"
      >
        sanjeev
        <AgGridReact
          rowSelection="single"
          suppressRowClickSelection
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={rowData}
        />
      </div>
    </div>
  );
}

export default Grid;
