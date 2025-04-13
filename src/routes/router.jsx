import React from 'react';
// 建立路由管理器
import { createBrowserRouter } from "react-router-dom";
import Home from "@/components/Home";
import Login from "@/components/Login";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router;