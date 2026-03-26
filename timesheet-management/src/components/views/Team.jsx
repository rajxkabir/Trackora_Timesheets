import { useState } from "react";
import { Plus, Search, Mail, Phone } from "lucide-react";
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

const teamMembers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@company.com",
        phone: "+1 234 567 890",
        role: "Senior Developer",
        department: "Engineering",
        status: "active",
        hoursThisWeek: 38,
    },
    {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah@company.com",
        phone: "+1 234 567 891",
        role: "UI/UX Designer",
        department: "Design",
        status: "active",
        hoursThisWeek: 42,
    },
    {
        id: 3,
        name: "Michael Chen",
        email: "michael@company.com",
        phone: "+1 234 567 892",
        role: "Project Manager",
        department: "Management",
        status: "away",
        hoursThisWeek: 35,
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily@company.com",
        phone: "+1 234 567 893",
        role: "Frontend Developer",
        department: "Engineering",
        status: "active",
        hoursThisWeek: 40,
    },
];

const statusStyles = {
    active: "bg-green-500",
    away: "bg-orange-500",
    offline: "bg-gray-400",
};

export function Team() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredMembers = teamMembers.filter((member) =>
        [member.name, member.role, member.department]
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                        Team
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Manage your team members and their activity.
                    </p>
                </div>

                <Button className="gap-2 rounded-xl">
                    <Plus className="w-4 h-4" />
                    Add Member
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search team..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-card/60 backdrop-blur border border-border"
                />
            </div>

            {/* Empty State */}
            {filteredMembers.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    No team members found.
                </div>
            )}

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMembers.map((member) => (
                    <Card
                        key={member.id}
                        className="group border border-border bg-card/60 backdrop-blur-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <CardContent className="p-6">
                            {/* Top */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Avatar className="w-14 h-14">
                                            <AvatarFallback className="bg-secondary text-lg font-medium">
                                                {member.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>

                                        {/* Status Dot */}
                                        <span
                                            className={cn(
                                                "absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background",
                                                statusStyles[member.status]
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="mt-5 space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                    <span className="truncate">{member.email}</span>
                                </div>

                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="w-4 h-4" />
                                    <span>{member.phone}</span>
                                </div>
                            </div>

                            {/* Bottom */}
                            <div className="mt-5 flex items-center justify-between">
                                <Badge
                                    variant="secondary"
                                    className="bg-secondary/50 text-foreground"
                                >
                                    {member.department}
                                </Badge>

                                <span className="text-sm">
                                    <span className="font-semibold">
                                        {member.hoursThisWeek}h
                                    </span>
                                    <span className="text-muted-foreground"> / week</span>
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}