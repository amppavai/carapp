import Home from "./Home";
import { test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import AddCar from "./components/AddCar";
import CarList from "./components/CarList";

test("renders Home component", () => {
    render(<Home />);
    const h2 = screen.getByText(/Welcome to My Car App!/i);
    expect(h2).toBeInTheDocument();
});

test("add car-button avaa AddCar-komponentin, ottaa vastaan syötteen ja onnistuu lisäämään uuden auton listalle", () => {
    //mock-funktio simuloi auton lisäämistä
    const mockAddCar = vi.fn();
    render(<AddCar addCar={mockAddCar} />);
    //avaa Add Car-lomake klikkaamalla buttonia
    const addButton = screen.getByRole('button', { name: /add car/i });
    fireEvent.click(addButton);
    //tarkista, että Add Car-lomake on auki
    expect(screen.getByText(/add car/i)).toBeInTheDocument();
    //syötä tiedot lomakkeeseen
    const brandInput = screen.getByLabelText(/brand/i);
    const modelInput = screen.getByLabelText(/model/i);
    const colorInput = screen.getByLabelText(/color/i);
    const fuelInput = screen.getByLabelText(/fuel/i);
    const yearInput = screen.getByLabelText(/year/i);
    const priceInput = screen.getByLabelText(/price/i);

    fireEvent.change(brandInput, { target: { value: 'Tesla' } });
    fireEvent.change(modelInput, { target: { value: 'Model S' } });
    fireEvent.change(colorInput, { target: { value: 'Black' } });
    fireEvent.change(fuelInput, { target: { value: 'Electric' } });
    fireEvent.change(yearInput, { target: { value: '2022' } });
    fireEvent.change(priceInput, { target: { value: '100000' } });
    //tarkista, että syötetyt tiedot ovat oikein
    expect(brandInput).toHaveValue('Tesla');
    expect(modelInput).toHaveValue('Model S');
    expect(colorInput).toHaveValue('Black');
    expect(fuelInput).toHaveValue('Electric');
    expect(yearInput).toHaveValue('2022');
    expect(priceInput).toHaveValue('100000');
    //simuloi tallennus klikkaamalla Save-nappia
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    //tarkista, että mock-funktio on kutsuttu oikein
    expect(mockAddCar).toHaveBeenCalledTimes(1);
    expect(mockAddCar).toHaveBeenCalledWith({
        brand: 'Tesla',
        model: 'Model S',
        color: 'Black',
        fuel: 'Electric',
        modelYear: '2022',
        price: '100000'
    });
});