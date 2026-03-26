import { useState } from "react";
import { Button, Input } from "../ui";
import { Navbar } from "../Navbar";

export default function AddProjectPage() {
    const [form, setForm] = useState({
        Name: "",
        ClientName: "",
        ClientEmail: "", // Required for contact records
        PlannedStartDate: "",
        PlannedEndDate: "",
        Budget: "",
        Priority: "Medium",
        Status: "InProgress"
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Ensure budget is a number and add CreatedBy if your API requires it
        const payload = {
            ...form,
            Budget: parseFloat(form.Budget) || 0,
            CreatedBy: 5001 // Default Admin ID for your system
        };

        try {
            const response = await fetch("https://localhost:7181/api/Project/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Project launched successfully!");
                setForm({ 
                    Name: "", ClientName: "", ClientEmail: "",
                    PlannedStartDate: "", PlannedEndDate: "",
                    Budget: "", Priority: "Medium", Status: "InProgress" 
                });
            } else {
                const errorData = await response.text();
                console.error("Server Error:", errorData);
                alert("Failed to save project. Check console for details.");
            }
        } catch (error) {
            alert("Could not connect to server.");
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar user="Admin" />
            <div className="max-w-7xl mx-auto pt-8 px-6 pb-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight px-1 text-primary">Launch New Project</h1>
                    <p className="mt-2 text-muted-foreground">Initialize a project with client details and deadlines.</p>
                </div>

                <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Object.keys(form).map((key) => {
                            // Format label from CamelCase to Spaced Words
                            const label = key.replace(/([A-Z])/g, ' $1').trim();
                            const isDate = key.includes("Date");
                            const isStatus = key === "Status";
                            const isPriority = key === "Priority";

                            return (
                                <div key={key} className="space-y-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase ml-1">{label}</label>
                                    
                                    {isStatus || isPriority ? (
                                        <select 
                                            name={key} 
                                            value={form[key]} 
                                            onChange={handleChange} 
                                            className="w-full h-11 px-3 rounded-xl bg-background border border-input text-foreground outline-none appearance-none cursor-pointer"
                                        >
                                            {isStatus && ["Pending", "InProgress", "Completed", "OnHold"].map(s => <option key={s} value={s}>{s}</option>)}
                                            {isPriority && ["Low", "Medium", "High", "Critical"].map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                    ) : (
                                        <Input 
                                            name={key} 
                                            type={isDate ? "date" : key === "Budget" ? "number" : "text"}
                                            value={form[key]} 
                                            onChange={handleChange} 
                                            placeholder={`Enter ${label.toLowerCase()}`} 
                                            className="h-11 rounded-xl bg-background border-input text-foreground" 
                                            required
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-end mt-10 pt-6 border-t border-border">
                        <Button type="submit" className="px-8 py-6 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all bg-primary text-primary-foreground">
                            Create Project
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}