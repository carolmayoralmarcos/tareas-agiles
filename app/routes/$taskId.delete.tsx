import { redirect, ActionFunction } from "@remix-run/node";
import { Form, useParams } from "@remix-run/react";
import { dbConnect } from "~/utils/db";
import Task from "~/models/tasks";


export const action: ActionFunction = async ({ params }) => {
    await dbConnect();
    const { taskId } = params as { taskId: string };
    if (typeof taskId === "string") {
        await Task.findByIdAndDelete(taskId);
    }

    return redirect("/tasks");
};

export default function DeleteTask() {
    const { taskId } = useParams();

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center" >
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm" >
                <h1 className="text-xl font-bold text-gray-700 mb-4" >¿Eliminar Tarea ? </h1>
                < Form method="post" >
                    <input type="hidden" name="taskId" value={taskId} />
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Confirmar Eliminación
                    </button>
                </Form>
            </div>
        </div>
    );
}
