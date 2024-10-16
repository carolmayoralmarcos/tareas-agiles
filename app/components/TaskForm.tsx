import { Form } from "@remix-run/react";
import { useState } from "react";

interface TaskFormProps {
    task?: {
        title: string;
        description: string;
        subtasks?: string[];
        priority?: "low" | "medium" | "high";
        dueDate?: string;
    };
}

export default function TaskForm({ task }: TaskFormProps) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [subtasks, setSubtasks] = useState<string[]>(task?.subtasks || [""]);
    const [priority, setPriority] = useState<"low" | "medium" | "high">(task?.priority || "medium");
    const [dueDate, setDueDate] = useState(task?.dueDate || "");

    const addSubtask = () => setSubtasks([...subtasks, ""]);
    const updateSubtask = (index: number, value: string) => {
        const newSubtasks = [...subtasks];
        newSubtasks[index] = value;
        setSubtasks(newSubtasks);
    };

    const handleSubmit = () => {

        setTitle("");
        setDescription("");
        setSubtasks([""]);
        setPriority("medium");
        setDueDate("");
    };

    return (
        <Form
            method="post"
            className="bg-purple-50 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto border border-purple-200"
            onSubmit={handleSubmit}
        >
            <h2 className="text-center text-2xl font-semibold text-purple-700 mb-6">Gestión de Tareas</h2>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label htmlFor="title" className="block text-purple-600 text-sm font-bold mb-2">
                        Título
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Escribe el título de la tarea"
                        className="border border-purple-300 bg-purple-50 rounded-md w-full py-2 px-4 text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-purple-600 text-sm font-bold mb-2">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe la tarea"
                        className="border border-purple-300 bg-purple-50 rounded-md w-full py-2 px-4 text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="subtasks" className="block text-purple-600 text-sm font-bold mb-2">
                        Subtareas
                    </label>
                    {subtasks.map((subtask, index) => (
                        <input
                            id="subtasks"
                            key={index}
                            type="text"
                            value={subtask}
                            onChange={(e) => updateSubtask(index, e.target.value)}
                            placeholder={`Subtarea ${index + 1}`}
                            className="border border-purple-300 bg-purple-50 rounded-md w-full py-2 px-4 text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        />
                    ))}
                    <button
                        type="button"
                        onClick={addSubtask}
                        className="text-purple-500 hover:text-purple-700 text-sm font-semibold mt-2"
                    >
                        + Añadir Subtarea
                    </button>
                </div>

                <div>
                    <label htmlFor="priority" className="block text-purple-600 text-sm font-bold mb-2">
                        Prioridad
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                        className="border border-purple-300 bg-purple-50 rounded-md w-full py-2 px-4 text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    >
                        <option value="low">Baja</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="dueDate" className="block text-purple-600 text-sm font-bold mb-2">
                        Fecha límite (Opcional)
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border border-purple-600 bg-purple-100 rounded-md w-full py-2 px-4 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                </div>

                <button type="submit" className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded-lg">
                    {task ? "Actualizar Tarea" : "Crear Tarea"}
                </button>
            </div>
        </Form>
    );
}
