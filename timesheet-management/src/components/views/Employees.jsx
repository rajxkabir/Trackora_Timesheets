import { useState, useMemo, useEffect } from "react";
import { Plus, Search, Mail, Phone, Briefcase, Users, Hash } from "lucide-react";
import { Button, Card, CardContent, Input, Badge } from "../ui";
import { cn } from "../../lib/utils";

const statusStyles = {
    ACTIVE: "bg-green-100 text-green-700",
    INACTIVE: "bg-red-100 text-red-700",
    ON_LEAVE: "bg-orange-100 text-orange-700",
};
   
export function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
   
    // 1. Fetch Data from Controller
   useEffect(() => {
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5289/api/Employee/all");
            if (!response.ok) throw new Error("Failed to fetch");
            
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error("Connection Error:", error);
            // Optional: You could set an error state here to show a toast message
        } finally {
            setLoading(false);
        }
    };
    fetchEmployees();
}, []);

    // 2. Optimized Filtering (Matches your Projects logic)
    const filteredEmployees = useMemo(() => {
        return employees.filter((emp) => {
            const fullName = `${emp.emP_FIRSTNAME} ${emp.emP_LASTNAME}`.toLowerCase();
            const email = emp.emP_GMAIL?.toLowerCase() || "";
            const query = searchQuery.toLowerCase();

            const matchesSearch = fullName.includes(query) || email.includes(query);
            const matchesFilter = filter === "all" || emp.emP_STATUS === filter;

            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, filter, employees]);

    if (loading) {
        return <div className="flex h-64 items-center justify-center">Loading Employees...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Employees</h1>
                    <p className="mt-1 text-muted-foreground">Manage your workforce and team assignments</p>
                </div>
                <Button className="gap-2 rounded-xl" onClick={() => window.location.href='/add-employee'}>
                    <Plus className="w-4 h-4" />
                    Add Employee
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-card border-0"
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    {["all", "ACTIVE", "INACTIVE"].map((status) => (
                        <Button
                            key={status}
                            variant={filter === status ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setFilter(status)}
                            className="capitalize"
                        >
                            {status.toLowerCase()}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Content State */}
            {filteredEmployees.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-lg font-medium">No employees found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEmployees.map((emp) => (
                        <Card key={emp.emP_ID} className="border-0 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                            <CardContent className="p-6">
                                {/* Title & Identity */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            {emp.emP_FIRSTNAME?.[0]}{emp.emP_LASTNAME?.[0]}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-semibold truncate">
                                                {emp.emP_FIRSTNAME} {emp.emP_LASTNAME}
                                            </h3>
                                            <p className="text-sm text-muted-foreground truncate flex items-center gap-1">
                                                <Briefcase className="w-3 h-3" /> {emp.emP_ROLE || "No Role"}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className={cn("capitalize", statusStyles[emp.emP_STATUS])}>
                                        {emp.emP_STATUS}
                                    </Badge>
                                </div>

                                {/* Employee Details */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Mail className="w-4 h-4 text-accent" />
                                        <span className="truncate">{emp.emP_GMAIL}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Phone className="w-4 h-4 text-green-500" />
                                        <span>{emp.emP_PHONE}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Users className="w-4 h-4 text-cyan-500" />
                                        <span>Team ID: {emp.emP_TEAM_ID || "N/A"}</span>
                                    </div>
                                </div>

                                {/* ID Footer */}
                                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wider">
                                    <div className="flex items-center gap-1">
                                        <Hash className="w-3 h-3" />
                                        <span>EMP-{emp.emP_ID}</span>
                                    </div>
                                    <span>Joined: {new Date(emp.emP_HIREDATE).toLocaleDateString()}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}