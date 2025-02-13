import { useState, useEffect } from "react";

export default function Bienvenida() {
  const [nombre, setNombre] = useState(localStorage.getItem("nombre") || "Usuario");
  const [empresa, setEmpresa] = useState(localStorage.getItem("empresa") || "Desconocida");

  useEffect(() => {
    const updateData = () => {
      setNombre(localStorage.getItem("nombre") || "Usuario");
      setEmpresa(localStorage.getItem("empresa") || "Desconocida");
    };

    // Llamamos la primera vez
    updateData();

    // Escuchar cambios en localStorage después del login
    window.addEventListener("storage", updateData);
    return () => window.removeEventListener("storage", updateData);
  }, []);

  return (
    <div className="bienvenida">
      <h1>Bienvenido {nombre} a tu portal de tutoriales para</h1>
      <h1> {empresa}</h1>
      <style>
        {`
          .bienvenida {
            text-align: center;
            margin-top: 3rem;
          }
          .bienvenida h1 {
            font-size: 30px;
            color: #333;
            font-family: 'Open Sans', sans-serif;
            font-weight: normal;
          }
        `}
      </style>
    </div>
  );
}
