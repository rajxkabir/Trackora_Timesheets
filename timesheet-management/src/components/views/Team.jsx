import { useState, useEffect, useMemo } from "react";
import { Plus, Search, Users, ShieldCheck, Hash, Info, Zap, LayoutGrid } from "lucide-react";
import {
    Button,
    Card,
    CardContent,
    Input,
    Avatar,
    AvatarFallback,
    Badge,
} from "../ui";
import { cn } from "../../lib/utils";

const statusStyles = {
    ACTIVE: "bg-green-500/10 text-green-500 border-green-500/20",
    INACTIVE: "bg-red-500/10 text-red-500 border-red-500/20",
};

export function Team() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // --- Fetch Teams from .NET API ---
    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            try {
                // Ensure this port matches your running .NET backend
                const response = await fetch("https://localhost:7181/api/Team/all");
                if (!response.ok) throw new Error("Failed to fetch teams");
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error("❌ API Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    // Filter logic for search bar
    const filteredTeams = useMemo(() => {
        return teams.filter((t) => {
            const name = t.team_name?.toLowerCase() || "";
            const code = t.TEAM_CODE?.toLowerCase() || "";
            const query = searchQuery.toLowerCase();
            return name.includes(query) || code.includes(query);
        });
    }, [searchQuery, teams]);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-primary font-black uppercase tracking-widest animate-pulse">Initializing Squads...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            {/* --- Header Section --- */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between bg-card/40 p-8 rounded-[2rem] border border-border/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] -z-10" />
                <div>
                    <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                        Internal Squads
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-2 text-lg">
                        <Users className="w-5 h-5 text-primary" /> 
                        <span className="font-bold text-foreground">{teams.length}</span> active units in the system
                    </p>
                </div>
                <Button className="h-12 px-6 gap-2 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95 group">
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" /> 
                    Create New Team
                </Button>
            </div>

            {/* --- Search Bar --- */}
            <div className="relative max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                    placeholder="Search by team name or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-card/40 border-border/50 rounded-2xl focus:ring-4 focus:ring-primary/10 backdrop-blur-md transition-all"
                />
            </div>

            {/* --- Grid Layout --- */}
            {filteredTeams.length === 0 ? (
                <div className="text-center py-32 bg-card/20 rounded-[3rem] border border-dashed border-border/50">
                    <LayoutGrid className="w-16 h-16 mx-auto text-muted-foreground opacity-20 mb-4" />
                    <h3 className="text-2xl font-bold text-muted-foreground">No squads matching your search</h3>
                </div>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTeams.map((team) => (
                        <Card
                            key={team.id}
                            className="group relative border-border/40 bg-card/30 backdrop-blur-md hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 overflow-hidden shadow-lg hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
                        >
                            {/* The "Glow" Effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur" />
                            
                            <CardContent className="p-8 relative">
                                {/* Top Badges */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                                        {team.team_name?.[0].toUpperCase()}
                                    </div>
                                    <Badge className={cn("px-4 py-1.5 rounded-full font-bold tracking-widest text-[10px]", statusStyles[team.status] || statusStyles.ACTIVE)}>
                                        {team.status}
                                    </Badge>
                                </div>

                                {/* Title & Code */}
                                <div className="space-y-1 mb-6">
                                    <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                                        {team.team_name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-primary/80 font-mono text-xs bg-primary/5 w-fit px-2 py-1 rounded-md">
                                        <Hash className="w-3 h-3" /> {team.TEAM_CODE}
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex items-start gap-2 h-10 line-clamp-2">
                                    <Info className="w-4 h-4 mt-1 shrink-0 text-primary/50" />
                                    {team.description || "Strategic unit focused on core deliverable tracking and resource management."}
                                </p>

                                {/* Lead Section */}
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/20 border border-border/50 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300">
                                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                                        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary text-white font-bold">
                                            {team.TeamLead?.EMP_FIRSTNAME?.[0]}{team.TeamLead?.EMP_LASTNAME?.[0] || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Commander</span>
                                        <span className="text-md font-bold truncate max-w-[120px]">
                                            {team.TeamLead ? `${team.TeamLead.EMP_FIRSTNAME} ${team.TeamLead.EMP_LASTNAME}` : "Unassigned"}
                                        </span>
                                    </div>
                                    <ShieldCheck className="w-5 h-5 ml-auto text-primary animate-pulse" />
                                </div>

                                {/* Progress Footer */}
                                <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Squad Size</span>
                                        <span className="text-lg font-mono font-black text-foreground">
                                            {team.max_members} <span className="text-xs text-muted-foreground">Cap</span>
                                        </span>
                                    </div>
                                    <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}