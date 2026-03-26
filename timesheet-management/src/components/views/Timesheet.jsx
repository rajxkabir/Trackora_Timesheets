import { useState, useEffect } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Play,
    Square,
    RotateCcw,
} from "lucide-react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui";
import { cn } from "../../lib/utils";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialEntries = [
    {
        id: 1,
        project: "Website Redesign",
        task: "Homepage UI Design",
        hours: [3.5, 4, 2.5, 3, 2, 0, 0],
        total: 15,
        color: "bg-accent",
    },
];

export function Timesheet() {
    const [entries, setEntries] = useState(initialEntries);
    const [seconds, setSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    /* ---------------- TIMER ---------------- */
    useEffect(() => {
        if (!isTimerRunning) return;

        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const formatTime = () => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${hrs}:${mins}:${secs}`;
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsTimerRunning(false);
    };

    /* ---------------- CALCULATIONS ---------------- */
    const weekTotals = weekDays.map((_, i) =>
        entries.reduce((sum, e) => sum + e.hours[i], 0)
    );

    const grandTotal = entries.reduce((sum, e) => sum + e.total, 0);

    /* ---------------- UPDATE HOURS ---------------- */
    const updateHours = (entryId, dayIndex, value) => {
        const num = parseFloat(value) || 0;

        setEntries((prev) =>
            prev.map((entry) => {
                if (entry.id !== entryId) return entry;

                const newHours = [...entry.hours];
                newHours[dayIndex] = num;

                return {
                    ...entry,
                    hours: newHours,
                    total: newHours.reduce((a, b) => a + b, 0),
                };
            })
        );
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                        Timesheet
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Track and manage your working hours.
                    </p>
                </div>

                {/* TIMER */}
                <Card className="bg-foreground text-background shadow-xl">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="text-center">
                            <p className="text-2xl font-mono font-semibold">
                                {formatTime()}
                            </p>
                            <p className="text-xs opacity-60">Current Session</p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                size="icon"
                                variant="secondary"
                                onClick={() => setIsTimerRunning(!isTimerRunning)}
                            >
                                {isTimerRunning ? (
                                    <Square className="w-4 h-4" />
                                ) : (
                                    <Play className="w-4 h-4" />
                                )}
                            </Button>

                            <Button size="icon" variant="secondary" onClick={resetTimer}>
                                <RotateCcw className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* TABLE */}
            <Card className="border border-border bg-card/60 backdrop-blur-xl shadow-sm">
                <CardHeader className="flex flex-row justify-between">
                    <CardTitle>Weekly Timesheet</CardTitle>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <ChevronLeft />
                        </Button>
                        <span className="text-sm">Mar 10 - Mar 16</span>
                        <Button variant="ghost" size="icon">
                            <ChevronRight />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border text-sm text-muted-foreground">
                                <th className="p-4 text-left pl-6">Task</th>

                                {weekDays.map((d) => (
                                    <th key={d} className="text-center p-4">
                                        {d}
                                    </th>
                                ))}

                                <th className="p-4 text-center pr-6">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {entries.map((entry) => (
                                <tr
                                    key={entry.id}
                                    className="border-b border-border hover:bg-secondary/40 transition"
                                >
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={cn(
                                                    "w-2.5 h-2.5 rounded-full",
                                                    entry.color
                                                )}
                                            />
                                            <div>
                                                <p className="font-medium">{entry.project}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {entry.task}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {entry.hours.map((h, i) => (
                                        <td key={i} className="p-2 text-center">
                                            <input
                                                type="number"
                                                value={h}
                                                onChange={(e) =>
                                                    updateHours(entry.id, i, e.target.value)
                                                }
                                                className="w-16 text-center border border-border rounded-md bg-background px-2 py-1 text-sm focus:ring-2 focus:ring-accent"
                                            />
                                        </td>
                                    ))}

                                    <td className="text-center font-semibold pr-6">
                                        {entry.total}h
                                    </td>
                                </tr>
                            ))}

                            {/* TOTAL ROW */}
                            <tr className="bg-secondary/30 font-medium">
                                <td className="p-4 pl-6">
                                    <Button variant="ghost" size="sm" className="gap-2">
                                        <Plus className="w-4 h-4" />
                                        Add Row
                                    </Button>
                                </td>

                                {weekTotals.map((t, i) => (
                                    <td key={i} className="text-center">
                                        {t ? `${t}h` : "-"}
                                    </td>
                                ))}

                                <td className="text-center font-bold pr-6">
                                    {grandTotal}h
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}