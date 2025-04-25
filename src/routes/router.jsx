import React from 'react';
// 建立路由管理器
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Main/Home";
import Login from "@/pages/Login/Login";
import TiptapEditor from "@/components/TiptapEditor";
import MainLayout from "@/pages/MainLayout";
import AdminLayout from "@/pages/AdminLayout";
import Dashboard from "@/pages/Admin/Dashboard";
import Record from "@/pages/Admin/Record";
import ErrorFix from "@/pages/Admin/ErrorFix";
import ItemDetail from "@/pages/Admin/ItemDetail";
import SaleRank from "@/pages/Admin/SaleRank";
import Stock from "@/pages/Admin/Stock";
import CheckIn from "@/pages/Main/CheckIn";
import CheckList from "@/pages/Main/CheckList";
import Purchase from "@/pages/Main/Purchase";
import WorkShift from "@/pages/Main/WorkShift";
import PrintAndSale from "@/pages/Main/PrintAndSale";
import Register from "@/pages/Login/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/check-in",
                element: <CheckIn />
            },
            {
                path: "/check-list",
                element: <CheckList />
            },
            {
                path: "/purchase",
                element: <Purchase />
            },
            {
                path: "/work-shift",
                element: <WorkShift />
            },
            {
                path: "/print-and-sale",
                element: <PrintAndSale />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin/dashboard",
                element: <Dashboard />
            },
            {
                path: "/admin/record",
                element: <Record />
            },
            {
                path: "/admin/error-fix",
                element: <ErrorFix />
            },
            {
                path: "/admin/item-detail",
                element: <ItemDetail />
            },
            {
                path: "/admin/sale-rank",
                element: <SaleRank />
            },
            {
                path: "/admin/stock",
                element: <Stock />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/editor",
        element: <TiptapEditor />
    }
])

export default router;