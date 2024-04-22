import React from 'react';
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {

    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    });

    const handleClickOpen = () => {
        setCar({ brand: props.params.data.brand, model: props.params.data.model, color: props.params.data.color, fuel: props.params.data.fuel, modelYear: props.params.data.modelYear, price: props.params.data.price })
        setOpen(true)
    }
    const handleSave = () => {
        console.log("EditCar: update current car");
        props.updateCar(car, props.params.data._links.car.href);
        setOpen(false);
    }

    const handleCancel = () => setOpen(false);

    return (
        <>
            <Button onClick={handleClickOpen}>Edit</Button>
            <Dialog
                open={open}>
                <DialogTitle>Edit This Car</DialogTitle>
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