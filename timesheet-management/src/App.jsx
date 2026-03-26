import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
    useNavigate,
    Navigate,
} from "react-router-dom";
import { useState } from "react";

import { LandingPage } from "./components/LandingPage";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/views/Dashboard";
import { Timesheet } from "./components/views/Timesheet";
import { Projects } from "./components/views/Projects";
import { Team } from "./components/views/Team";
import { Reports } from "./components/views/Reports";
import { cn } from "./lib/utils";
import Login from "./components/Login";
import { Employees } from "./components/views/Employees";
import AddEmployeePage from "./components/Admin/AddEmployee";


/* ================= LAYOUT ================= */
function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname;

    // Hide layout on public pages
    const hideLayout = path === "/" || path === "/login";

    const handleViewChange = (view) => {
        navigate(`/${view}`);
        setSidebarOpen(false);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navbar + Sidebar */}
            {!hideLayout && (
                <>
                    <Navbar
                        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                        isSidebarOpen={sidebarOpen}
                    />

                    <Sidebar
                        isOpen={sidebarOpen}
                        activeView={path.split("/")[1]} // better than replace
                        onViewChange={handleViewChange}
                    />
                </>
            )}

            {/* Main Content */}
            <main
                className={cn(
                    !hideLayout && "pt-14 md:pl-64",
                    "transition-all duration-300"
                )}
            >
                <div className="p-6 md:p-8 lg:p-10">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPageWrapper />} />
                        <Route path="/login" element={<LoginWrapper />} />

                        {/* App Routes */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/timesheet" element={<Timesheet />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/reports" element={<Reports />} />

                        <Route path="/add-employee" element={<AddEmployeePage />} />
                        <Route path="/employees" element={<Employees />} />

                        {/* Default fallback */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

/* ================= WRAPPERS ================= */

function LandingPageWrapper() {
    const navigate = useNavigate();

    return (
        <LandingPage
            onGetStarted={() => navigate("/login")}
        />
    );
}

function LoginWrapper() {
    const navigate = useNavigate();

    return (
        <Login
            onLogin={() => navigate("/dashboard", { replace: true })}
        />
    );
}

/* ================= ROOT ================= */

export default function App() {
    return (
        
            <AppLayout />
      
    );
}