import React, { Suspense, lazy } from 'react';
// 建立路由管理器
import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

// 使用 lazy 動態導入組件
const Home = lazy(() => import("@/pages/Main/Home"));
const Login = lazy(() => import("@/pages/Login/Login"));
const TiptapEditor = lazy(() => import("@/components/TiptapEditor"));
const MainLayout = lazy(() => import("@/pages/MainLayout"));
const AdminLayout = lazy(() => import("@/pages/AdminLayout"));
const Dashboard = lazy(() => import("@/pages/Admin/Dashboard"));
const Record = lazy(() => import("@/pages/Admin/Record"));
const ErrorFix = lazy(() => import("@/pages/Admin/ErrorFix"));
const ItemDetail = lazy(() => import("@/pages/Admin/ItemDetail"));
const SaleRank = lazy(() => import("@/pages/Admin/SaleRank"));
const Stock = lazy(() => import("@/pages/Admin/Stock"));
const CheckIn = lazy(() => import("@/pages/Main/CheckIn"));
const CheckList = lazy(() => import("@/pages/Main/CheckList"));
const Purchase = lazy(() => import("@/pages/Main/Purchase"));
const WorkShift = lazy(() => import("@/pages/Main/WorkShift"));
const PrintAndSale = lazy(() => import("@/pages/Main/PrintAndSale"));
const Register = lazy(() => import("@/pages/Login/Register"));

// 創建一個通用的 Suspense 包裝組件
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ErrorBoundary>
                <SuspenseWrapper>
                    <MainLayout />
                </SuspenseWrapper>
            </ErrorBoundary>
        ),
        children: [
            {
                path: "/",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <Home />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            },
            {
                path: "/check-in",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <CheckIn />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            },
            {
                path: "/check-list",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <CheckList />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            },
            {
                path: "/purchase",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <Purchase />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            },
            {
                path: "/work-shift",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <WorkShift />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            },
            {
                path: "/print-and-sale",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <PrintAndSale />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            }
        ]
    },
    {
        path: "/admin",
        element: (
            <ErrorBoundary>
                <SuspenseWrapper>
                    <AdminLayout />
                </SuspenseWrapper>
            </ErrorBoundary>
        ),
        children: [
            {
                path: "/admin/dashboard",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <Dashboard />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            },
            {
                path: "/admin/record",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <Record />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            },
            {
                path: "/admin/error-fix",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <ErrorFix />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            },
            {
                path: "/admin/item-detail",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <ItemDetail />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            },
            {
                path: "/admin/sale-rank",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <SaleRank />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            },
            {
                path: "/admin/stock",
                element: (
                    <ErrorBoundary>
                        <SuspenseWrapper>
                            <Stock />
                        </SuspenseWrapper>
                    </ErrorBoundary>
                )
            }
        ]
    },
    {
        path: "/login",
        element: (
            <ErrorBoundary>
                <SuspenseWrapper>
                    <Login />
                </SuspenseWrapper>
            </ErrorBoundary>
        )
    },
    {
        path: "/register",
        element: (
            <ErrorBoundary>
                <SuspenseWrapper>
                    <Register />
                </SuspenseWrapper>
            </ErrorBoundary>
        )
    },
    {
        path: "/editor",
        element: (
            <ErrorBoundary>
                <SuspenseWrapper>
                    <TiptapEditor />
                </SuspenseWrapper>
            </ErrorBoundary>
        )
    }
])

export default router;