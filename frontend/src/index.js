import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./page/Login";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Menu from "./page/Menu";
import Home from "./page/Home";
import Contact from "./page/Contact";
import About from "./page/About";
import Newproduct from "./page/Newproduct";
import Signup from "./page/Signup";
import { store } from './redux/index'
import { Provider } from "react-redux";
import Cart from "./page/Cart";
import BecomeSeller from "./page/BecomeSeller";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./page/Dashboard";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
       <Route index element={<Home />} />
      {/* <Route path="menu" element={<Menu />} /> */}
      <Route path="menu/:filterby" element={<Menu />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="Newproduct" element={<Newproduct />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="Cart" element={<Cart />} />
      <Route path="BecomeSeller" element={<BecomeSeller />} />
      <Route path="Dashboard" element={<Dashboard />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
     <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
