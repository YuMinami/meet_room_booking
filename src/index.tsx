import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ErrorPage} from "./pages/error/ErrorPage";
import {Login} from "./pages/login/Login";
import {Register} from "./pages/register/Register";
import {UpdatePassword} from "./pages/update_password/UpdatePassword";
import {Menu} from "antd";
import {ModifyMenu} from "./pages/modify_menu/ModifyMenu";
import {InfoModify} from "./pages/info_modify/InfoModify";
import {PasswordModify} from "./pages/password_modify/PasswordModify";
import {UserManage} from "./pages/user_manage/UserManage";
import {Index} from "./pages/index";
import {UpdateInfo} from "./pages/update_info/UpdateInfo";


const routes = [{
    path: "/",
    element: <Index></Index>,
    errorElement: <ErrorPage/>,
    children: [
        {
            path: "update_info",
            element: <UpdateInfo/>,
        }
    ]
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
