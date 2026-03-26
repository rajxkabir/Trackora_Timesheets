import { useState } from "react";
import { Button, Input } from "../ui";
import { Navbar } from "../Navbar";
import { Eye, EyeOff } from "lucide-react";

export default function AddEmployeePage() {
    const [form, setForm] = useState({
        EMP_FIRSTNAME: "", EMP_LASTNAME: "", EMP_GMAIL: "",
        EMP_PHONE: "", EMP_ROLE: "", EMP_SALARY: "",
        EMP_COUNTRY: "", EMP_STATE: "",
        EMP_CITY: "", EMP_ADDRESS: "",
        EMP_AADHAR: "", EMP_PAN: "", EMP_PASSWORD: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const roles = ["Developer", "Tester", "Manager", "TeamLead", "HR"];
    const teamIds = Array.from({ length: 9 }, (_, i) => 1001 + i);
    const projectIds = Array.from({ length: 9 }, (_, i) => 5001 + i);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            EMP_SALARY: parseFloat(form.EMP_SALARY) || 0
        };

        try {
            const response = await fetch("http://localhost:5289/api/Employee/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Employee added successfully!");
                setForm({
                    EMP_FIRSTNAME: "", EMP_LASTNAME: "", EMP_GMAIL: "",
                    EMP_PHONE: "", EMP_ROLE: "", EMP_SALARY: "",
                    EMP_COUNTRY: "", EMP_STATE: "",
                    EMP_CITY: "", EMP_ADDRESS: "",
                    EMP_AADHAR: "", EMP_PAN: "", EMP_PASSWORD: "",
                });
            } else {
                alert("Failed to save employee.");
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
                    <h1 className="text-4xl font-bold tracking-tight text-foreground px-1">
                        Add Employee
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Create a new profile and assign initial projects.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all"
                >
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Object.keys(form).map((key) => {
                            const label = key.replace("EMP_", "").replace(/_/g, " ");
                            const isDropdown = ["EMP_ROLE", "EMP_TEAM_ID", "EMP_PROJECT_ID"].includes(key);
                            const isPassword = key === "EMP_PASSWORD";

                            return (
                                <div key={key} className="space-y-2">
                                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
                                        {label}
                                    </label>

                                    <div className="relative">
                                        {isDropdown ? (
                                            <select
                                                name={key}
                                                value={form[key]}
                                                onChange={handleChange}
                                                className="w-full h-11 px-3 rounded-xl bg-background border border-input text-foreground focus:ring-2 focus:ring-ring focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-background text-foreground">Select {label.toLowerCase()}</option>
                                                {key === "EMP_ROLE" && roles.map(r => <option key={r} value={r} className="bg-background text-foreground">{r}</option>)}
                                                {key === "EMP_TEAM_ID" && teamIds.map(id => <option key={id} value={id} className="bg-background text-foreground">{id}</option>)}
                                                {key === "EMP_PROJECT_ID" && projectIds.map(id => <option key={id} value={id} className="bg-background text-foreground">{id}</option>)}
                                            </select>
                                        ) : (
                                            <>
                                                <Input
                                                    name={key}
                                                    value={form[key]} // This ensures the typed text stays in the field
                                                    onChange={handleChange}
                                                    type={isPassword ? (showPassword ? "text" : "password") : "text"}
                                                    placeholder={`Enter ${label.toLowerCase()}`}
                                                    /* Added explicit text-foreground to ensure the typed text 
                                                       doesn't blend into the background.
                                                    */
                                                    className={`h-11 rounded-xl bg-background border-input text-foreground !text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring transition-all ${isPassword ? "pr-10" : ""}`}
                                                />
                                                {isPassword && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-end mt-10 pt-6 border-t border-border">
                        <Button
                            type="submit"
                            className="px-8 py-6 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all"
                        >
                            Save Employee Profile
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}