import { json, redirect, ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { dbConnect } from "~/utils/db";
import Task from "~/models/tasks";
import TaskList from "~/components/TaskList";
import TaskForm from "~/components/TaskForm";
import { verifyToken } from "~/utils/jwt";

interface TaskType {
    _id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
}



export const loader: LoaderFunction = async ({ request }) => {
    await dbConnect();

    const cookie = request.headers.get("Cookie");
    const token = cookie?.split("token=")[1];

    if (!token) {
        return redirect("/login");
    }

    const { success, data: user } = verifyToken(token);
    if (!success || !user) {
        return redirect("/login");
    }

    const tasks = await Task.find({ userId: user.id });
    return json({ tasks: tasks.map((task) => task.toObject()) });
};


export const action: ActionFunction = async ({ request, params }) => {
    await dbConnect();
    const formData = await request.formData();
    const method = formData.get("_method") || request.method.toUpperCase();

    const { taskId } = params;
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const status = formData.get("status") as string | null;
    const priority = formData.get("priority") as "low" | "medium" | "high" | null;


    const cookie = request.headers.get("Cookie");
    const token = cookie?.split("token=")[1];
    const user = verifyToken(token).data;

    if (method === "POST") {
        await Task.create({ title, description, status, priority, userId: user.id });
    } else if (method === "PUT" && taskId) {
        await Task.findByIdAndUpdate(taskId, { title, description, status, priority });
    } else if (method === "DELETE" && taskId) {
        await Task.findByIdAndDelete(taskId);
    }

    return redirect("/tasks");
};

export default function Tasks() {
    const { tasks } = useLoaderData<{ tasks: TaskType[] }>();
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        setFilteredTasks(
            tasks.filter(
                (task) =>
                    (filter === "all" || task.status === filter) &&
                    task.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [filter, searchTerm, tasks]);

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => setShowNotification(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-200 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-purple-100 border border-purple-300 p-2 rounded-lg"
                        >
                            <option value="all">Todas</option>
                            <option value="pending">Pendientes</option>
                            <option value="in progress">En progreso</option>
                            <option value="completed">Completadas</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar por título..."
                            className="bg-purple-100 border border-purple-300 p-2 rounded-lg"
                        />
                    </div>
                </div>

                <div className="mb-8">
                    <TaskForm />
                </div>

                <TaskList tasks={filteredTasks} />

                <div className="mt-8 p-4 bg-purple-200 rounded-lg">
                    <h2 className="text-2xl font-bold text-purple-800">Estadísticas de tareas</h2>
                    <div className="grid grid-cols-3 gap-4 mt-4 text-lg">
                        <p>Total: {tasks.length}</p>
                        <p>Pendientes: {tasks.filter((task) => task.status === "pending").length}</p>
                        <p>En progreso: {tasks.filter((task) => task.status === "in progress").length}</p>
                        <p>Completadas: {tasks.filter((task) => task.status === "completed").length}</p>
                    </div>
                </div>

                {showNotification && (
                    <div id="notification" className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                        <p>Tarea actualizada con éxito!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
