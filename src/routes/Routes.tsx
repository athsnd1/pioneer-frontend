import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import ErrorPage from "../pages/ErrorPage.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import DashboardLayout from "../layouts/DashboardLayout.tsx";
import LoadingPage from "../pages/LoadingPage";
import DashboardSkeleton from "../components/DashboardSkeleton";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const LogsPage = lazy(() => import("../pages/LogsPage"));
const NewReportPage = lazy(() => import("../pages/NewReportPage"));
const EditPage = lazy(() => import("../pages/EditPage"));
const ProvideEmail = lazy(() => import("../pages/ProvideEmail"));
const CreateNewPassword = lazy(() => import("../pages/CreateNewPassword"));
const AddStudentPage = lazy(() => import("../pages/AddStudentPage"));
const ViewStudentsPage = lazy(() => import("../pages/ViewStudentsPage"));
const MonthlyStatsPage = lazy(() => import("../pages/MonthlyStatsPage"));
const EditStudentPage = lazy(() => import("../pages/EditStudentPage"));


const router = createBrowserRouter([

    {
        path: "/",
        element: (<ProtectedRoute>
                    <DashboardLayout />
                </ProtectedRoute>),
        children: [
                    {
                        index: true,
                        element: <Suspense fallback={<DashboardSkeleton />}><HomePage /></Suspense>
                    },
                    {
                        path: "logs",
                        element: <Suspense fallback={<LoadingPage />}><LogsPage /></Suspense>
                    },
                    {
                        path: "create",
                        element: <Suspense fallback={<LoadingPage />}><NewReportPage /></Suspense>
                    },
                    {
                        path: "edit/:id",
                        element: <Suspense fallback={<LoadingPage />}><EditPage /></Suspense>,
                        errorElement: <ErrorPage />
                    },
                    {
                        path: "edit-student/:id",
                        element: <Suspense fallback={<LoadingPage />}><EditStudentPage /></Suspense>,
                        errorElement: <ErrorPage />
                    },
                    {
                        path: "/add-student",
                        element: <Suspense fallback={<LoadingPage />}> <AddStudentPage /> </Suspense>,
                        errorElement: <ErrorPage />
                    },
                    {
                        path: "/students",
                        element: <Suspense fallback={<LoadingPage />}> <ViewStudentsPage /> </Suspense>,
                        errorElement: <ErrorPage />
                    },
                    {
                        path: "/monthly-stats",
                        element: <Suspense fallback={<LoadingPage />}> <MonthlyStatsPage /> </Suspense>,
                        errorElement: <ErrorPage />
                    }
                ],
        errorElement: <ErrorPage />
    },

    {
        path: "/login",
        element: <Suspense fallback={<LoadingPage />}><LoginPage /></Suspense>,
        errorElement: <ErrorPage />
    },

    {
        path: "/register",
        element: <Suspense fallback={<LoadingPage />}><RegisterPage /></Suspense>,
        errorElement: <ErrorPage />
    },
    {
        path: "/forgot-password",
        element: <Suspense fallback={<LoadingPage />}><ProvideEmail /></Suspense>,
        errorElement: <ErrorPage />
    },
    {
        path: "/reset-password",
        element: <Suspense fallback={<LoadingPage />}><CreateNewPassword /></Suspense>,
        errorElement: <ErrorPage />
    },

]);

export default router;