import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../ui";
import { Navbar } from "../Navbar";

export default function AddTeamPage() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        team_name: "",
        description: "",
        max_members: "",
        status: "ACTIVE",
        team_lead_id: "" // Start empty
    });

    // Fetch existing employees to populate the dropdown
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("https://localhost:7181/api/Employee/all");
                if (response.ok) {
                    const data = await response.json();
                    setEmployees(data);
                }
            } catch (error) {
                console.error("Failed to load employees:", error);
            }
        };
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.team_lead_id) {
            alert("Please assign a Squad Lead.");
            return;
        }

        const payload = {
            ...form,
            max_members: parseInt(form.max_members) || 0,
            team_lead_id: parseInt(form.team_lead_id)
        };

        try {
            const response = await fetch("https://localhost:7181/api/Team/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Squad successfully mobilized!");
                navigate("/team");
            } else {
                alert("Transmission failed. Check if all fields are valid.");
            }
        } catch (error) {
            console.error("Connection Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar user="Admin" />
            <div className="max-w-4xl mx-auto pt-12 px-6">
                <div className="mb-10">
                    <h1 className="text-4xl font-black tracking-tighter uppercase">Form New Squad</h1>
                    <p className="text-muted-foreground mt-2 font-medium">Define the unit name, capacity, and commander.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-card/40 p-8 rounded-[2.5rem] border border-border shadow-2xl backdrop-blur-md">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest ml-1 text-primary">Squad Name</label>
                            <Input name="team_name" value={form.team_name} onChange={handleChange} placeholder="e.g. Alpha-9" required className="h-12 rounded-2xl" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest ml-1 text-primary">Max Capacity</label>
                            <Input name="max_members" type="number" value={form.max_members} onChange={handleChange} placeholder="e.g. 12" required className="h-12 rounded-2xl" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest ml-1 text-primary">Assign Squad Lead (Commander)</label>
                        <select 
                            name="team_lead_id" 
                            value={form.team_lead_id} 
                            onChange={handleChange}
                            className="w-full h-12 rounded-2xl bg-background border border-input px-4 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            required
                        >
                            <option value="">Select an Employee...</option>
                            {employees.map(emp => (
                                <option key={emp.emp_id} value={emp.emp_id}>
                                    {emp.emp_firstname} {emp.emp_lastname} (ID: {emp.emp_id})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest ml-1 text-primary">Operational Briefing</label>
                        <textarea 
                            name="description" 
                            value={form.description} 
                            onChange={handleChange} 
                            placeholder="Detail the squad's primary objective..."
                            className="w-full min-h-[120px] p-4 rounded-2xl bg-background border border-input outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                        />
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-border">
                        <Button type="button" variant="ghost" onClick={() => navigate("/team")}>Cancel</Button>
                        <Button type="submit" className="h-12 px-10 rounded-2xl font-bold shadow-lg shadow-primary/20 bg-primary">
                            Deploy Squad
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}