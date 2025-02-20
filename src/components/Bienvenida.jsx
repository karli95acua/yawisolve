import { useEffect, useState } from "react";

const Bienvenida = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/";
            return;
        }

        // 🛠️ Comprueba si los datos están en localStorage
        const nombre = localStorage.getItem("nombre");
        const empresa = localStorage.getItem("empresa");

        if (!nombre || !empresa) {
            console.error("❌ No se encontraron datos del usuario en localStorage.");
            localStorage.removeItem("token");
            window.location.href = "/";
            return;
        }

        setUser({ nombre, empresa });
    }, []);

    if (!user) return null;

    return (
        <section className="w-full p-6 bg-slate-100 shadow-md rounded-lg text-center">
            <h1 className="text-4xl font-bold text-gray-800">Bienvenido, {user.nombre}!</h1>
            <p className="text-gray-600">Empresa: {user.empresa}</p>
        </section>
    );
};

export default Bienvenida;
