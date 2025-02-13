import { useState, useEffect } from "react";

export default function Bienvenida() {
  const [nombre, setNombre] = useState(localStorage.getItem("nombre") || "Usuario");
  const [empresa, setEmpresa] = useState(localStorage.getItem("empresa") || "Desconocida");

  useEffect(() => {
    const updateData = () => {
      setNombre(localStorage.getItem("nombre") || "Usuario");
      setEmpresa(localStorage.getItem("empresa") || "Desconocida");
    };

    updateData();

    window.addEventListener("storage", updateData);
    return () => window.removeEventListener("storage", updateData);
  }, []);

  return (
    <div className="text-center mt-12">
      <h1 className="text-2xl md:text-3xl font-light text-gray-800">
        Bienvenido <span className="font-semibold">{nombre}</span> a tu portal de tutoriales para
      </h1>
      <h1 className="text-2xl md:text-3xl font-light text-gray-800 mt-2">
        <span className="font-semibold">{empresa}</span>
      </h1>
    </div>
  );
}

