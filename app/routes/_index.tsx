
import { Link } from "@remix-run/react";

import { dbConnect } from "~/utils/db";
import Task from "~/models/tasks";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";






export const loader = async () => {
    await dbConnect();
    const tasks = await Task.find();
    return { tasks };
};


export default function Index() {


    return (
        <>

            <Navbar />


            <section className="hero-section bg-gradient-to-r from-green-400 to-blue-500 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-6xl font-bold mb-4">Tareas Ágiles</h1>
                    <p className="text-xl mb-8">
                        ¡Organiza tus tareas, aumenta tu productividad y alcanza tus metas con nuestro gestor de tareas rápido y eficiente!
                    </p>
                    <Link
                        to="/tasks"
                        className="bg-white text-blue-500 font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition"
                    >
                        Acceder a la Gestión de Tareas
                    </Link>
                </div>
            </section>


            <section className="auth-section py-12 bg-gray-100 text-center">
                <h2 className="text-3xl font-bold mb-6">Empieza ahora</h2>
                <div className="flex justify-center space-x-6">
                    <Link
                        to="/register"
                        className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-400 transition"
                    >
                        Registrarse
                    </Link>
                    <Link
                        to="/login"
                        className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-400 transition"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
            </section>


            <Footer />
        </>
    );
}
