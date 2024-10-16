import { Link } from "@remix-run/react";


interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    priority: "low" | "medium" | "high";
    subtasks?: { title: string; completed: boolean }[];
}

interface TaskListProps {
    tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
    return (
        <div className="bg-neutral-100 p-8 rounded-lg shadow-lg">
            <h2 className="text-4xl font-semibold mb-6 text-center text-gray-800">Mis tareas </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className={`border p-4 rounded-lg shadow-md ${task.status === "completed"
                            ? "bg-green-100 border-green-500"
                            : task.status === "in progress"
                                ? "bg-yellow-100 border-yellow-500"
                                : "bg-white border-gray-300"
                            }`}
                    >
                        <h3 className="text-xl font-bold mb-2 text-gray-700">{task.title}</h3>
                        <p className="text-gray-600 mb-4">{task.description}</p>

                        <p className="font-bold text-purple-700">
                            Prioridad:{" "}
                            <span
                                className={`${task.priority === "high"
                                    ? "text-red-500"
                                    : task.priority === "medium"
                                        ? "text-yellow-500"
                                        : "text-green-500"
                                    }`}
                            >
                                {task.priority}
                            </span>
                        </p>


                        {task.subtasks && task.subtasks.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-lg font-semibold">Subtareas</h4>
                                <ul className="list-disc list-inside ml-4">
                                    {task.subtasks.map((subtask, index) => (
                                        <li
                                            key={index}
                                            className={`${subtask.completed ? "line-through text-gray-400" : ""
                                                }`}
                                        >
                                            {subtask.title}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-4">
                            <Link
                                to={`/${task._id}/edit`}
                                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Editar
                            </Link>

                            <Link
                                to={`/${task._id}/delete`}
                                className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
                            >
                                Eliminar Tarea
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}