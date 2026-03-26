import { useState, useMemo } from "react";
import { Plus, Search, Clock, Users, Calendar } from "lucide-react";
import { Button, Card, CardContent, Input, Badge } from "../ui";
import { cn } from "../../lib/utils";

const projectsData = [
    {
        id: 1,
        name: "Website Redesign",
        client: "Acme Corporation",
        status: "active",
        progress: 65,
        hours: 120,
        budget: 15000,
        team: 4,
        dueDate: "Mar 30, 2026",
        color: "bg-accent",
    },
    {
        id: 2,
        name: "Mobile App Development",
        client: "TechStart Inc",
        status: "active",
        progress: 40,
        hours: 85,
        budget: 25000,
        team: 6,
        dueDate: "Apr 15, 2026",
        color: "bg-green-500",
    },
    {
        id: 3,
        name: "API Integration",
        client: "DataFlow Systems",
        status: "active",
        progress: 80,
        hours: 45,
        budget: 8000,
        team: 2,
        dueDate: "Mar 20, 2026",
        color: "bg-cyan-500",
    },
    {
        id: 4,
        name: "Marketing Dashboard",
        client: "Growth Labs",
        status: "on-hold",
        progress: 25,
        hours: 30,
        budget: 12000,
        team: 3,
        dueDate: "May 01, 2026",
        color: "bg-orange-500",
    },
];

const statusStyles = {
    active: "bg-green-100 text-green-700",
    completed: "bg-gray-100 text-gray-600",
    "on-hold": "bg-orange-100 text-orange-700",
};

export function Projects() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");

    // 🔥 Optimized filtering
    const filteredProjects = useMemo(() => {
        return projectsData.filter((project) => {
            const name = project.name?.toLowerCase() || "";
            const client = project.client?.toLowerCase() || "";
            const query = searchQuery.toLowerCase();

            const matchesSearch =
                name.includes(query) || client.includes(query);

            const matchesFilter =
                filter === "all" || project.status === filter;

            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, filter]);

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Projects
                    </h1>
                    <p className="mt-1 text-muted-foreground">
                        Manage and track all your projects
                    </p>
                </div>

                <Button className="gap-2 rounded-xl">
                    <Plus className="w-4 h-4" />
                    New Project
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-card border-0"
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    {["all", "active", "on-hold", "completed"].map((status) => (
                        <Button
                            key={status}
                            variant={filter === status ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setFilter(status)}
                            className="capitalize"
                        >
                            {status === "on-hold" ? "On Hold" : status}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-lg font-medium">No projects found</p>
                    <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                    </p>
                </div>
            ) : (
                /* Projects Grid */
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => {
                        const safeProgress = Math.min(project.progress, 100);

                        return (
                            <Card
                                key={project.id}
                                className="border-0 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                            >
                                <CardContent className="p-6">

                                    {/* Title */}
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={cn(
                                                    "w-3 h-3 rounded-full shrink-0",
                                                    project.color
                                                )}
                                            />
                                            <div className="min-w-0">
                                                <h3 className="font-semibold truncate">
                                                    {project.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground truncate">
                                                    {project.client}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Progress
                                            </span>
                                            <span className="font-medium">
                                                {safeProgress}%
                                            </span>
                                        </div>

                                        <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
                                            <div
                                                className={cn(
                                                    "h-full rounded-full transition-all",
                                                    project.color
                                                )}
                                                style={{ width: `${safeProgress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            <span>{project.hours}h</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-4 h-4" />
                                            <span>{project.team}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" />
                                            <span>{project.dueDate}</span>
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-4 flex items-center justify-between">
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "capitalize",
                                                statusStyles[project.status] ||
                                                "bg-gray-100 text-gray-600"
                                            )}
                                        >
                                            {project.status === "on-hold"
                                                ? "On Hold"
                                                : project.status}
                                        </Badge>

                                        <span className="text-sm font-medium">
                                            ₹{project.budget.toLocaleString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}