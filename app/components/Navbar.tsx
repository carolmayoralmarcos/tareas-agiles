import { Link } from "@remix-run/react";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-2xl font-bold">
                    Tareas Ágiles
                </Link>
                <div>
                    <Link to="/" className="px-3">Inicio</Link>
                    <Link to="/tasks" className="px-3">Tareas</Link>
                    <Link to="/login" className="px-3">Iniciar Sesión</Link>
                    <Link to="/register" className="px-3">Registrarse</Link>
                </div>
            </div>
        </nav>
    );
}
