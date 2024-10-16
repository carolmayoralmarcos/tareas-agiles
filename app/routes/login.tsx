import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { ActionFunction, json, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { dbConnect } from "~/utils/db";
import User from "~/models/users";
import { generateToken } from "~/utils/jwt";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await dbConnect();


    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return json({ error: "Credenciales inválidas" }, { status: 401 });
    }


    const token = generateToken({ id: user._id, email: user.email });


    return redirect("/tasks", {
        headers: {
            "Set-Cookie": `token=${token}; HttpOnly; Path=/; Secure; SameSite=Lax`,
        },
    });
};


export default function Login() {
    const actionData = useActionData<{ error?: string }>();
    const [showPassword, setShowPassword] = useState(false);



    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Iniciar Sesión</h2>
                <Form method="post" className="space-y-4">
                    {actionData?.error && (
                        <div className="bg-red-100 text-red-500 p-2 rounded">
                            {actionData.error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-2 border border-purple-300 bg-[#E0D4F5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="mt-1 block w-full px-4 py-2 border border-purple-300 bg-[#E0D4F5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-indigo-500 focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 border-[#E0D4F5] !bg-[#E0D4F5] focus:ring-purple-500 focus:ring-opacity-50 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Recuérdame</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                    >
                        Iniciar Sesión
                    </button>
                </Form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    ¿No tienes una cuenta? <a href="/register" className="text-indigo-500 font-semibold">Regístrate aquí</a>
                </p>
            </div>
        </div>
    );
}
