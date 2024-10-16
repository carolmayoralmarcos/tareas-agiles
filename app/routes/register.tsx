
import { Form, useActionData } from "@remix-run/react";
import { ActionFunction, json, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { dbConnect } from "~/utils/db";
import User from "~/models/users";


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;


    if (password !== confirmPassword) {
        return json({ error: "Las contraseñas no coinciden" }, { status: 400 });
    }

    await dbConnect();


    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return json({ error: "Este correo ya está registrado" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    await User.create({ email, password: hashedPassword });

    return redirect("/login");
};

export default function Register() {
    const actionData = useActionData<{ error?: string }>();
    const errorMessage = actionData?.error || "";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-200">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Regístrate</h2>


                {errorMessage && (
                    <div className="bg-red-100 text-red-500 p-2 rounded">
                        {errorMessage}
                    </div>
                )}

                <Form method="post" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-2 border border-purple-300 bg-[#E0D4F5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Escribe tu correo electrónico"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="mt-1 block w-full px-4 py-2 border border-purple-300 bg-[#E0D4F5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Escribe tu contraseña"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            className="mt-1 block w-full px-4 py-2 border border-purple-300 bg-[#E0D4F5] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Confirma tu contraseña"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                    >
                        Crear Cuenta
                    </button>
                </Form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/login" className="text-purple-500 font-semibold">
                        Inicia Sesión
                    </a>
                </p>
            </div>
        </div>
    );
}
