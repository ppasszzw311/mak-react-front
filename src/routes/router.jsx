import React from 'react';
// 建立路由管理器
import { createBrowserRouter } from "react-router-dom";
import Home from "@/components/Home";
import Login from "@/components/Login";
import TiptapEditor from "@/components/TiptapEditor";

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
    },
    {
        path: "/editor",
        element: <TiptapEditor />
    }
])

export default router;