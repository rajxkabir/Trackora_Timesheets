import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added for routing
import { Plus, Search, Clock, Users, Calendar, Briefcase, Zap, Target } from "lucide-react";
import { Button, Card, CardContent, Input, Badge } from "../ui";
import { cn } from "../../lib/utils";

// Mapping Backend Status to UI Colors
const statusStyles = {
    Pending: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    InProgress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Completed: "bg-green-500/10 text-green-500 border-green-500/20",
    OnHold: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
};

// Priority specific glow effects
const priorityColors = {
    Critical: "bg-red-500",
    High: "bg-orange-500",
    Medium: "bg-blue-500",
    Low: "bg-slate-400",
};

export function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate(); // Initialize navigation

    // Fetch from .NET API
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://localhost:7181/api/Project/all");
                if (!response.ok) throw new Error("Failed to fetch projects");
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Optimized filtering
    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const name = project.Name?.toLowerCase() || "";
            const client = project.ClientName?.toLowerCase() || "";
            const query = searchQuery.toLowerCase();
            const matchesSearch = name.includes(query) || client.includes(query);
            const matchesFilter = filter === "all" || project.Status === filter;
            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, filter, projects]);

    if (loading) return <div className="flex h-64 items-center justify-center animate-pulse text-primary font-bold">Initializing Projects...</div>;

    return (
        <div className="space-y-6 p-4">
            {/* Glassmorphism Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card/40 p-6 rounded-3xl border border-border/50 backdrop-blur-md">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                        Project Hub
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1 font-medium">
                        <Target className="w-4 h-4 text-primary" /> {projects.length} Active Deliverables
                    </p>
                </div>
                {/* ROUTE ADDED HERE */}
                <Button 
                    onClick={() => navigate("/add-project")}
                    className="gap-2 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                >
                    <Plus className="w-4 h-4" /> New Project
                </Button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input 
                        placeholder="Search by project name or client..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full h-11 bg-card/50 border border-border/50 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none px-4"
                    />
                </div>
                <div className="flex bg-card/50 p-1 rounded-xl border border-border/50 overflow-x-auto">
                    {["all", "InProgress", "Pending", "Completed"].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                                filter === s ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {s === "InProgress" ? "In Progress" : s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Project Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                    <Card key={project.Id} className="group relative border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-sm">
                        
                        {/* Priority Indicator Glow */}
                        <div className={cn("absolute top-0 left-0 w-1 h-full opacity-50", priorityColors[project.Priority])} />

                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors leading-tight">
                                        {project.Name}
                                    </h3>
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        {project.ClientName}
                                    </p>
                                </div>
                                <Badge className={cn("text-[10px] font-black border", statusStyles[project.Status])}>
                                    {project.Status}
                                </Badge>
                            </div>

                            {/* Tech Stack / Code */}
                            <div className="flex gap-2 mb-6">
                                <span className="text-[10px] bg-secondary/50 px-2 py-0.5 rounded font-mono font-bold">
                                    {project.PROJECT_CODE}
                                </span>
                                {project.Priority === "Critical" && (
                                    <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-bold animate-pulse">
                                        CRITICAL
                                    </span>
                                )}
                            </div>

                            {/* Progress Section */}
                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                                    <span>Completion</span>
                                    <span className="text-primary">{project.Progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                                    <div 
                                        className={cn("h-full transition-all duration-1000", priorityColors[project.Priority])}
                                        style={{ width: `${project.Progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Project Meta Info */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase leading-none">Due Date</span>
                                        <span className="text-xs font-semibold text-foreground">
                                            {project.PlannedEndDate ? new Date(project.PlannedEndDate).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground justify-end text-right">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase leading-none">Budget</span>
                                        <span className="text-xs font-bold text-foreground">
                                            ₹{project.Budget?.toLocaleString()}
                                        </span>
                                    </div>
                                    <Zap className="w-4 h-4 text-yellow-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {!loading && filteredProjects.length === 0 && (
                <div className="text-center py-20 bg-card/20 rounded-3xl border border-dashed border-border">
                    <Briefcase className="w-12 h-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                    <h3 className="text-xl font-bold">No projects found</h3>
                    <p className="text-muted-foreground">Adjust your filters or start a new initiative.</p>
                </div>
            )}
        </div>
    );
}