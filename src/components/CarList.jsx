import { AgGridReact } from "ag-grid-react";
import { useEffect, useState, useRef } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {
    //states
    const [cars, setCars] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState("");
    const URL = 'https://carrestservice-carshop.rahtiapp.fi/cars';
    const gridRef = useRef();
    const [open, setOpen] = useState(false);

    const [colDefs, setColDefs] = useState([
        { field: 'brand', sortable: true, filter: true },
        { field: 'model', sortable: true, filter: true },
        { field: 'color', sortable: true, filter: true },
        { field: 'fuel', sortable: true, filter: true },
        { field: 'modelYear', sortable: true, filter: true },
        { field: 'price', sortable: true, filter: true },
        {
            cellRenderer: params => <EditCar updateCar={updateCar} params={params} />, width: 120
        },
        {
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCar(params)}>Delete
                </Button>,
            width: 120
        }
    ]);

    useEffect(() => getCars(), []); //fetch only after the first render

    //functions:

    //getCars
    const getCars = () => {
        fetch(URL, { method: 'GET' })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(responsedata => {
                console.log(responsedata._embedded.cars);
                setCars(responsedata._embedded.cars);
            })
            .catch(error => console.error(error))
    }

    //deleteCar
    const deleteCar = (params) => {
        console.log(params.data._links.car.href);
        if (window.confirm("Are you sure?")) {
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        //snackbar-viesti
                        setMsgSnackbar("The car was deleted succesfully!")
                        setOpenSnackbar(true);
                        getCars(); //haetaan päivittynyt autotilanne tietovarastosta
                    } else {
                        setMsgSnackbar("Something went wrong while deleting.")
                        setOpenSnackbar(true);
                    }
                })
                .catch(error => console.error(error));
        }
    }
    //add car
    const addCar = (car) => {
        console.log("CarList: addCar");
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(response => {
                console.log("response " + response);
                if (response.ok) {
                    setMsgSnackbar("Auto lisätty onnistuneesti");
                    setOpen(true);
                    return response.json;
                } else {
                    throw new Error('Datan tallennus backendiin ei onnistunut');
                }
            })
            .then(data => {
                console.log("parsed Json = " + data);
                getCars();
            })
            .catch(err => console.error(err))
    }
    //editCar
    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(car)
        })
            .then(response => {
                console.log("response " + response);
                if (response.ok) {
                    setMsgSnackbar("Car updated succesfully!");
                    setOpen(true);
                    return response.json();
                } else {
                    throw new Error('Datan päivitys backendiin ei onnistunut');
                }
            })
            .then(data => {
                console.log("parsed Json = " + data);
                getCars()
            })
            .catch(error => console.error(error));
    }

    //return
    return (
        <>
            <AddCar addCar={addCar} />
            <p>(scroll sideways to see all car details)</p>
            <div className="ag-theme-material" style={{ width: '120%', height: '700px'}}>

                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 30, 50]}
                    animateRows={true}
                    rowSelection="single"
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                />
                <Snackbar
                    open={openSnackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => {
                        setOpenSnackbar(false);
                        setMsgSnackbar("")// tyhjennetään snackbar-viesti
                    }}
                >
                </Snackbar>
            </div>
        </>
    )
}
