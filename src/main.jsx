import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import './App.css'

import App from './App.jsx';
import Home from './Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Error from './Error.jsx';
import CarList from './components/CarList';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    // kun path mätsää URL:n kanssa, renderöidään elementti
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true // index route ei tarvitse polkua
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cars",
        element: <CarList />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
