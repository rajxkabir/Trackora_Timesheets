import { useState, useEffect } from "react";
import { Button, Input } from "./ui";
import {
    ArrowRight,
    Lock,
    User,
    Eye,
    EyeOff,
    Clock,
    Moon,
    Sun
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // ✅ Theme Logic
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

    // ✅ Validation Function
    const validateForm = () => {
        const newErrors = {};

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@arnasoftech\.com$/;
        if (!username) {
            newErrors.username = "Email is required";
        } else if (!emailPattern.test(username)) {
            newErrors.username = "Email must end with @arnasoftech.com";
        }

        // Password validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,15}$/;
        if (!password) {
            newErrors.password = "Password is required";
        } else if (!passwordPattern.test(password)) {
            newErrors.password = "Password must be 8-15 characters, include uppercase, lowercase, number, and special character";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="h-screen w-screen bg-background flex flex-col selection:bg-accent/30 overflow-hidden">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 cursor-pointer group w-32">
                        <div className="relative w-8 h-8 rounded-lg bg-foreground flex items-center justify-center transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110 shadow-lg shadow-foreground/10">
                            <Clock className="w-4 h-4 text-background" />
                            <div className="absolute inset-0 rounded-lg bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-foreground transition-all duration-500 group-hover:text-blue-500">
                            Trackora
                        </span>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl border border-border bg-secondary/50 transition-all duration-300 hover:bg-secondary hover:scale-105 active:scale-95"
                    >
                        {theme === "dark" ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-slate-700" />}
                    </button>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-10 relative">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-[10%] left-[15%] w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-cyan-500/10 blur-[100px] rounded-full" />
                </div>

                <div className="group relative w-full max-w-[400px]">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-[30px] blur opacity-0 group-hover:opacity-20 transition duration-500" />
                    <div className="relative w-full p-8 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-500 mt-5">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 ring-1 ring-accent/20">
                                <Lock className="w-5 h-5 text-accent" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground tracking-tight">
                                Welcome Back
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1 text-center">
                                Enter your details to access your account
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest ml-1">Email</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Email"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={"pl-10 h-11 bg-background/50 border-border/60 focus:ring-2 focus:ring-blue-500/20 transition-all " +
                                            (username ? "ring-1 ring-blue-500/20" : "")}
                                    />
                                </div>
                                {errors.username && <p className="text-red-500 text-xs ml-1">{errors.username}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Password</label>
                                  
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={"pl-10 pr-10 h-11 bg-background/50 border-border/60 focus:ring-2 focus:ring-blue-500/20 transition-all " +
                                            (password ? "ring-1 ring-blue-500/20" : "")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password}</p>}
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 rounded-xl bg-foreground text-background font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-2"
                            >
                                Sign In
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </form>


                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-700" />
                    </div>
                </div>
            </main>
        </div>
    );
}