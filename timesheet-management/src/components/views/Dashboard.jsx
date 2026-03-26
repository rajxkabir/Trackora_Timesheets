import { Clock, TrendingUp, Calendar, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui";

const stats = [
    {
        title: "Hours This Week",
        value: "32.5",
        change: "+2.5h from last week",
        icon: Clock,
    },
    {
        title: "Active Projects",
        value: "8",
        change: "3 due this week",
        icon: Target,
    },
    {
        title: "Billable Hours",
        value: "28h",
        change: "86% billable rate",
        icon: TrendingUp,
    },
    {
        title: "Days Worked",
        value: "4/5",
        change: "1 day remaining",
        icon: Calendar,
    },
];

const weeklyData = [
    { day: "Mon", hours: 8.5 },
    { day: "Tue", hours: 7.5 },
    { day: "Wed", hours: 9.0 },
    { day: "Thu", hours: 7.5 },
    { day: "Fri", hours: 0 },
];

const recentEntries = [
    { id: 1, project: "Website Redesign", task: "Homepage UI", hours: 3.5, date: "Today" },
    { id: 2, project: "Mobile App", task: "API Integration", hours: 4.0, date: "Today" },
    { id: 3, project: "API Development", task: "Authentication", hours: 2.5, date: "Yesterday" },
    { id: 4, project: "Website Redesign", task: "Dashboard", hours: 5.0, date: "Yesterday" },
];

export function Dashboard() {
    // ✅ Fix: prevent divide by 0
    const maxHours = Math.max(...weeklyData.map((d) => d.hours), 1);

    return (
        <div className="space-y-10">

            {/* Header */}
            <div>
                <h1 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Dashboard
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Welcome back. Here's your productivity snapshot.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-xl p-6 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        {stat.title}
                                    </p>
                                    <p className="mt-3 text-3xl font-bold tracking-tight">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {stat.change}
                                    </p>
                                </div>

                                <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-accent/60 text-white shadow-md group-hover:scale-110 transition-transform">
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
                        </div>
                    );
                })}
            </div>

            {/* Charts + Activity */}
            <div className="grid gap-6 lg:grid-cols-2">

                {/* Weekly Chart */}
                <Card className="border border-border bg-card/60 backdrop-blur-xl shadow-sm">
                    <CardHeader>
                        <CardTitle>Weekly Activity</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex items-end justify-between gap-3 h-52">
                            {weeklyData.map((day) => {
                                const heightPercent = (day.hours / maxHours) * 100;

                                return (
                                    <div
                                        key={day.day}
                                        className="flex flex-1 flex-col items-center gap-2 group"
                                    >
                                        <div className="relative w-full flex items-end justify-center h-40">

                                            <div
                                                className="w-full max-w-10 rounded-xl bg-gradient-to-t from-accent to-accent/40 transition-all duration-300 group-hover:scale-105"
                                                style={{
                                                    height: `${heightPercent}%`,
                                                    minHeight: day.hours > 0 ? "10px" : "0",
                                                }}
                                            />

                                            {day.hours > 0 && (
                                                <span className="absolute -top-6 text-xs text-muted-foreground">
                                                    {day.hours}h
                                                </span>
                                            )}
                                        </div>

                                        <span className="text-xs text-muted-foreground">
                                            {day.day}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border border-border bg-card/60 backdrop-blur-xl shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="space-y-4">
                            {recentEntries.map((entry) => (
                                <div
                                    key={entry.id}
                                    className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/40 p-4 transition-all hover:bg-secondary hover:shadow-md"
                                >
                                    <div>
                                        <p className="font-medium">{entry.project}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {entry.task}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-semibold">{entry.hours}h</p>
                                        <p className="text-xs text-muted-foreground">
                                            {entry.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}