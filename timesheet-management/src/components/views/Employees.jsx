import { useState, useMemo, useEffect } from "react";
import { Plus, Search, Mail, Phone, Briefcase, Users, Hash, MapPin, Zap } from "lucide-react";
import { Button, Card, CardContent, Input, Badge } from "../ui";
import { cn } from "../../lib/utils";

const statusStyles = {
    ACTIVE: "bg-green-500/10 text-green-500 border-green-500/20",
    INACTIVE: "bg-red-500/10 text-red-500 border-red-500/20",
    ON_LEAVE: "bg-orange-500/10 text-orange-500 border-orange-500/20",
};

export function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://localhost:7181/api/Employee/all");
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Connection Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const filteredEmployees = useMemo(() => {
        return employees.filter((emp) => {
            const fullName = `${emp.EMP_FIRSTNAME} ${emp.EMP_LASTNAME}`.toLowerCase();
            const email = emp.EMP_GMAIL?.toLowerCase() || "";
            const query = searchQuery.toLowerCase();
            const matchesSearch = fullName.includes(query) || email.includes(query);
            const matchesFilter = filter === "all" || emp.EMP_STATUS === filter;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, filter, employees]);

    if (loading) return <div className="flex h-64 items-center justify-center animate-pulse text-primary">Loading Employees...</div>;

    return (
        <div className="space-y-6 p-4">
            {/* Header Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card/40 p-6 rounded-3xl border border-border/50 backdrop-blur-md">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Workforce</h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <Users className="w-4 h-4" /> {employees.length} Total Team Members
                    </p>
                </div>
                <Button className="gap-2 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" onClick={() => window.location.href='/add-employee'}>
                    <Plus className="w-4 h-4" /> Add Employee
                </Button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search by name, email or role..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-11 bg-card/50 border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div className="flex bg-card/50 p-1 rounded-xl border border-border/50">
                    {["all", "ACTIVE", "INACTIVE"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize",
                                filter === s ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Employee Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredEmployees.map((emp) => (
                    <Card key={emp.EMP_ID} className="group relative border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <Zap className="w-5 h-5 text-primary fill-primary" />
                        </div>
                        
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-inner">
                                    {emp.EMP_FIRSTNAME?.[0]}{emp.EMP_LASTNAME?.[0]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                                        {emp.EMP_FIRSTNAME} {emp.EMP_LASTNAME}
                                    </h3>
                                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                        <Briefcase className="w-3 h-3" /> {emp.EMP_ROLE || "Staff"}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                                    <Mail className="w-4 h-4 text-primary/70" />
                                    <span className="text-sm font-medium truncate">{emp.EMP_GMAIL}</span>
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                                    <MapPin className="w-4 h-4 text-primary/70" />
                                    <span className="text-sm font-medium">{emp.EMP_CITY}, {emp.EMP_STATE}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                <Badge className={cn("text-[10px] font-black tracking-widest uppercase px-3 py-1", statusStyles[emp.EMP_STATUS])}>
                                    {emp.EMP_STATUS}
                                </Badge>
                                <div className="text-right">
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Employee ID</p>
                                    <p className="text-sm font-mono font-bold">#{emp.EMP_ID}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}