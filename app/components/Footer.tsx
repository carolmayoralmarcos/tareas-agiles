import { Link } from "@remix-run/react";

export default function Footer() {
    return (
        <footer className="bg-gray-800 p-8 text-white mt-20">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <h3 className="text-lg font-bold mb-4">Sobre Nosotros</h3>
                    <p className="text-gray-400">
                        Tareas Ágiles es una plataforma diseñada para ayudarte a gestionar tus proyectos y tareas de manera rápida y eficiente. Maximiza tu productividad y mantén todo bajo control con nuestra herramienta intuitiva.
                    </p>
                </div>


                <div>
                    <h3 className="text-lg font-bold mb-4">Enlaces útiles</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/about" className="text-gray-400 hover:text-white transition">
                                Acerca de
                            </Link>
                        </li>
                        <li>
                            <Link to="/faq" className="text-gray-400 hover:text-white transition">
                                Preguntas Frecuentes
                            </Link>
                        </li>
                        <li>
                            <Link to="/support" className="text-gray-400 hover:text-white transition">
                                Soporte
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy" className="text-gray-400 hover:text-white transition">
                                Política de Privacidad
                            </Link>
                        </li>
                    </ul>
                </div>


                <div>
                    <h3 className="text-lg font-bold mb-4">Síguenos</h3>
                    <p className="text-gray-400 mb-4">¡Conéctate con nosotros a través de nuestras redes sociales!</p>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 fill-current text-gray-400 hover:text-white transition"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 fill-current text-gray-400 hover:text-white transition"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.67 2a4.48 4.48 0 00-4.17 6.17A12.94 12.94 0 013 4s-4 9 5 13a13.06 13.06 0 01-8 2c13 8 22 2 22-12.5a9.66 9.66 0 00-.08-1.55A10.33 10.33 0 0023 3z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 fill-current text-gray-400 hover:text-white transition"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>


            <div className="mt-8 border-t border-gray-700"></div>


            <div className="container mx-auto text-center text-gray-400 mt-4">
                <p>&copy; 2024 Tareas Ágiles. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
