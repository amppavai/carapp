import React from 'react';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCar(props) {

    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    });

    //open = false, kun ikkuna on kiinni
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleSave = () => {
        console.log("AddCar: save a new car");
        props.addCar(car);
        setOpen(false);
    }

    const handleCancel = () => setOpen(false);

    return (
        <>
            <Button style={{margin: 10}} variant="outlined" onClick={handleClickOpen}>Add Car</Button>
            <Dialog
                open={open}>
                <DialogTitle>Add a New Car</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Brand"
                        value={car.brand}
                        onChange={(e) => setCar({ ...car, brand: e.target.value })}
                        variant="standard"
                        fullWidth>
                    </TextField>
                    <TextField
                        label="Model"
                        value={car.model}
                        onChange={(e) => setCar({ ...car, model: e.target.value })}
                        variant="standard">
                    </TextField>
                    <TextField
                        label="Color"
                        value={car.color}
                        onChange={(e) => setCar({ ...car, color: e.target.value })}
                        variant="standard"
                        fullWidth>
                    </TextField>
                    <TextField
                        label="Fuel"
                        value={car.fuel}
                        onChange={(e) => setCar({ ...car, fuel: e.target.value })}
                        variant="standard"
                        fullWidth>
                    </TextField>
                    <TextField
                        label="Year"
                        value={car.modelYear}
                        onChange={(e) => setCar({ ...car, modelYear: e.target.value })}
                        variant="standard"
                        fullWidth>
                    </TextField>
                    <TextField
                        label="Price"
                        value={car.price}
                        onChange={(e) => setCar({ ...car, price: e.target.value })}
                        variant="standard"
                        fullWidth>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}