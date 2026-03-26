import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { Button, Avatar, AvatarFallback } from "./ui";

export function Navbar({ onMenuClick, isSidebarOpen, user = "John Doe" }) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <div className="flex h-full items-center justify-between px-4 md:px-6">

                {/* LEFT SECTION: Menu & Logo */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="md:hidden"
                    >
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>

                    <div className="flex items-center gap-2">
                        <div className="flex w-8 h-8 items-center justify-center rounded-lg bg-foreground">
                            <Clock className="w-4 h-4 text-background" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight">
                            Trackora
                        </span>
                    </div>
                </div>

                {/* RIGHT SECTION: Actions */}
                <div className="flex items-center gap-1 md:gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="transition-all duration-300 hover:bg-secondary"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </Button>

                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-secondary text-foreground text-sm">
                                {getInitials(user)}
                            </AvatarFallback>
                        </Avatar>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}