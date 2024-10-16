import { json, redirect, LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData, Form, useNavigate } from "@remix-run/react";
import { dbConnect } from "~/utils/db";
import Task from "~/models/tasks";


export const loader: LoaderFunction = async ({ params }) => {
    await dbConnect();

    const task = await Task.findById(params.taskId);
    if (!task) {
        throw new Response("Tarea no encontrada", { status: 404 });
    }

    return json({ task: task.toObject() });
};


export const action: ActionFunction = async ({ request, params }) => {
    await dbConnect();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string;
    const priority = formData.get("priority") as "low" | "medium" | "high";

    await Task.findByIdAndUpdate(params.taskId, {
        title,
        description,
        status,
        priority,
    });

    return redirect("/tasks");
};


export default function EditTask() {
    const { task } = useLoaderData<{ task: { title: string; description: string; status: string; priority: "low" | "medium" | "high"; } }>();
    const navigate = useNavigate();


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-200">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Editar Tarea</h1>

                <Form method="post" className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={task.title}
                            className="mt-1 block w-full px-4 py-2 border border-purple-300 bg-[#E0D4F5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={task.description}
                            className="mt-1 block w-full px-4 py-2 border border-purple-300 bg-[#E0D4F5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                        <select
                            id="status"
                            name="status"
                            defaultValue={task.status}
                            className="mt-1 block w-full px-4 py-2 border border-purple-300 bg-[#E0D4F5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="pending">Pendiente</option>
                            <option value="in progress">En Progreso</option>
                            <option value="completed">Completada</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridad</label>
                        <select
                            id="priority"
                            name="priority"
                            defaultValue={task.priority}
                            className="mt-1 block w-full px-4 py-2 border border-purple-300 bg-[#E0D4F5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="low">Baja</option>
                            <option value="medium">Media</option>
                            <option value="high">Alta</option>
                        </select>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                        >
                            Guardar Cambios
                        </button>

                        <button
                            type="button"
                            className="mt-4 text-purple-500 hover:text-purple-700"
                            onClick={() => navigate("/tasks")}
                        >
                            Cancelar
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
