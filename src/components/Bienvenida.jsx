import { useEffect, useState } from "react";

const Bienvenida = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window === "undefined") return; // Previene acceso en SSR

        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        fetch("http://localhost:4000/auth/validate", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(response => {
            if (!response.ok) throw new Error("Token inválido o expirado");
            return response.json();
        })
        .then(data => {
            setUser({ nombre: data.user.nombre, empresa: data.user.empresa?.nombre });
        })
        .catch(error => {
            console.error("❌ Error al validar el token:", error);
            localStorage.removeItem("token");
            window.location.href = "/login";
        });
    }, []);

    if (!user) return null; // ⚠️ Evita renderizado hasta que haya datos

    return (
        <section className="p-6 bg-slate-100 shadow-md rounded-lg text-center">
            <h1 className="text-4xl font-bold text-gray-800">Bienvenido, {user.nombre}!</h1>
            <p className="text-gray-600">Empresa: {user.empresa}</p>
        </section>
    );
};

export default Bienvenida;



