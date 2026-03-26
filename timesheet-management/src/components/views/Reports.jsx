import {
    Download,
    Calendar,
    TrendingUp,
    TrendingDown,
    Minus,
} from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "../ui";
import { cn } from "../../lib/utils";

const summaryStats = [
    { label: "Total Hours", value: "1,008", change: "+5.2%", trend: "up" },
    { label: "Billable Hours", value: "856", change: "+3.8%", trend: "up" },
    { label: "Utilization Rate", value: "85%", change: "-2.1%", trend: "down" },
    { label: "Revenue Generated", value: "$128,400", change: "+8.5%", trend: "up" },
];

const projectBreakdown = [
    { name: "Website Redesign", hours: 120, percentage: 30, color: "bg-accent" },
    { name: "Mobile App", hours: 85, percentage: 21, color: "bg-green-500" },
    { name: "API Development", hours: 65, percentage: 16, color: "bg-cyan-500" },
    { name: "CRM System", hours: 55, percentage: 14, color: "bg-orange-500" },
    { name: "Other", hours: 75, percentage: 19, color: "bg-purple-500" },
];

const teamPerformance = [
    { name: "John Doe", role: "Senior Developer", hours: 168, billable: 152, utilization: 90 },
    { name: "Sarah Johnson", role: "UI/UX Designer", hours: 172, billable: 145, utilization: 84 },
    { name: "Michael Chen", role: "Project Manager", hours: 160, billable: 120, utilization: 75 },
    { name: "Emily Davis", role: "Frontend Developer", hours: 164, billable: 148, utilization: 90 },
];

export function Reports() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                        Reports
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Analyze time tracking and team performance insights.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 rounded-xl">
                        <Calendar className="w-4 h-4" />
                        This Month
                    </Button>
                    <Button className="gap-2 rounded-xl">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {summaryStats.map((stat) => (
                    <Card
                        key={stat.label}
                        className="border border-border bg-card/60 backdrop-blur-xl shadow-sm hover:shadow-xl transition-all"
                    >
                        <CardContent className="p-6">
                            <p className="text-sm text-muted-foreground">{stat.label}</p>

                            <div className="mt-3 flex items-center justify-between">
                                <p className="text-3xl font-bold">{stat.value}</p>

                                <span
                                    className={cn(
                                        "flex items-center gap-1 text-xs font-medium",
                                        stat.trend === "up"
                                            ? "text-green-600"
                                            : stat.trend === "down"
                                                ? "text-red-500"
                                                : "text-muted-foreground"
                                    )}
                                >
                                    {stat.trend === "up" ? (
                                        <TrendingUp className="w-3 h-3" />
                                    ) : stat.trend === "down" ? (
                                        <TrendingDown className="w-3 h-3" />
                                    ) : (
                                        <Minus className="w-3 h-3" />
                                    )}
                                    {stat.change}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Project Breakdown */}
            <Card className="border border-border bg-card/60 backdrop-blur-xl shadow-sm">
                <CardHeader>
                    <CardTitle>Project Breakdown</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-5">
                        {projectBreakdown.map((project) => (
                            <div key={project.name}>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={cn("w-2.5 h-2.5 rounded-full", project.color)}
                                        />
                                        <span className="font-medium">{project.name}</span>
                                    </div>

                                    <span className="text-muted-foreground">
                                        {project.hours}h ({project.percentage}%)
                                    </span>
                                </div>

                                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-500",
                                            project.color
                                        )}
                                        style={{ width: `${project.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Team Performance */}
            <Card className="border border-border bg-card/60 backdrop-blur-xl shadow-sm">
                <CardHeader>
                    <CardTitle>Team Performance</CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border text-sm text-muted-foreground">
                                    <th className="text-left p-4 pl-6">Member</th>
                                    <th className="text-left p-4">Hours</th>
                                    <th className="text-left p-4">Billable</th>
                                    <th className="text-left p-4">Utilization</th>
                                    <th className="text-left p-4 pr-6">Performance</th>
                                </tr>
                            </thead>

                            <tbody>
                                {teamPerformance.map((member) => {
                                    const performance =
                                        member.utilization >= 85
                                            ? "excellent"
                                            : member.utilization >= 70
                                                ? "good"
                                                : "low";

                                    return (
                                        <tr
                                            key={member.name}
                                            className="border-b border-border hover:bg-secondary/40 transition"
                                        >
                                            <td className="p-4 pl-6">
                                                <p className="font-medium">{member.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {member.role}
                                                </p>
                                            </td>

                                            <td className="p-4">{member.hours}h</td>
                                            <td className="p-4">{member.billable}h</td>

                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-1.5 w-24 rounded-full bg-secondary">
                                                        <div
                                                            className={cn(
                                                                "h-full rounded-full",
                                                                performance === "excellent"
                                                                    ? "bg-green-500"
                                                                    : performance === "good"
                                                                        ? "bg-orange-500"
                                                                        : "bg-red-500"
                                                            )}
                                                            style={{ width: `${member.utilization}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {member.utilization}%
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="p-4 pr-6">
                                                <span
                                                    className={cn(
                                                        "flex items-center gap-1 text-sm font-medium",
                                                        performance === "excellent"
                                                            ? "text-green-600"
                                                            : performance === "good"
                                                                ? "text-orange-600"
                                                                : "text-red-500"
                                                    )}
                                                >
                                                    {performance === "excellent" ? (
                                                        <>
                                                            <TrendingUp className="w-4 h-4" /> Excellent
                                                        </>
                                                    ) : performance === "good" ? (
                                                        <>
                                                            <Minus className="w-4 h-4" /> Good
                                                        </>
                                                    ) : (
                                                        <>
                                                            <TrendingDown className="w-4 h-4" /> Needs Attention
                                                        </>
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}