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


const routes = [{
    path: "/",
    element: <div>index</div>,
    errorElement: <ErrorPage/>,
    children: [
        {
            path: "/",
            element: <Menu></Menu>,
            children: [
                {
                    path: 'user_manage',
                    element: <UserManage/>
                }
            ]
        }, {
            path: "/user",
            element: <ModifyMenu></ModifyMenu>,
            children: [
                {
                    path: 'info_modify',
                    element: <InfoModify/>
                }, {
                    path: 'password_modify',
                    element: <PasswordModify/>
                },
            ]
        },
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
