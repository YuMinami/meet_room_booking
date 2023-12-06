import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ErrorPage} from "./ErrorPage";
import {Login} from "./Login";
import {Register} from "./Register";
import {UpdatePassword} from "./UpdatePassword";


const routes = [{
    path: "/",
    element: <div>index</div>,
    errorElement: <ErrorPage/>,
}, {
    path: "login",
    element: <Login/>,
}, {
    path: "register",
    element: <Register/>,
}, {
    path: "update_password",
    element: <UpdatePassword/>,
}];

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router}/>
);
