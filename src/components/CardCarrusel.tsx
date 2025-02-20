import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import useMeasure from "react-use-measure";

const CARD_WIDTH = 350;
const CARD_HEIGHT = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;

const BREAKPOINTS = {
    sm: 640,
    lg: 1024,
};

// 🔹 Mapeo de imágenes y rutas para cada módulo
const modulosData: Record<number, { imagen: string; href: string }> = {
    1: { imagen: "/calidad.jpeg", href: "/calidad" },
    2: { imagen: "/fondo.jpeg", href: "/configuracion" },
    3: { imagen: "/labores.jpeg", href: "/tareo-campo" },
    4: { imagen: "/cosecha.jpeg", href: "/cosecha" },
    5: { imagen: "/sanidad.jpeg", href: "/sanidad" },
    6: { imagen: "/maq.jpeg", href: "/maquinarias" },
    11: { imagen: "/seguridad.jpg", href: "/seguridad" },
};

const CardCarrusel = () => {
    const [ref, { width }] = useMeasure();
    const [offset, setOffset] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [modulosFiltrados, setModulosFiltrados] = useState<{ modulo_id: number; nombre: string }[]>([]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const empresa_id = localStorage.getItem("empresa_id");

        if (!empresa_id) {
            console.warn("⚠️ No se encontró empresa_id en localStorage.");
            return;
        }

        console.log("🏢 Empresa ID obtenida:", empresa_id);

        fetch(`http://localhost:4000/modulos/empresa/${empresa_id}`)
            .then(response => {
                if (!response.ok) throw new Error("❌ Error al obtener módulos.");
                return response.json();
            })
            .then(data => {
                console.log("📥 Módulos obtenidos:", data);

                // ✅ Filtrar solo módulos activos
                const modulosActivos = data.filter((modulo: any) =>
                    modulo.empresasModulos.some((em: any) => em.activo === true)
                );

                console.log("✅ Módulos filtrados activos:", modulosActivos);
                setModulosFiltrados(modulosActivos);
                setIsClient(true); // ✅ Ahora el frontend está listo para renderizar
            })
            .catch(error => console.error("🚨 Error cargando módulos:", error));
    }, []);

    if (!isClient) {
        console.log("🚫 CardCarrusel aún no está en el cliente, esperando...");
        return <p className="text-center text-gray-500">Cargando módulos...</p>;
    }

    console.log("🎥 Renderizando CardCarrusel con módulos:", modulosFiltrados);

    const CARD_BUFFER = width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;
    const CAN_SHIFT_LEFT = offset < 0;
    const CAN_SHIFT_RIGHT = Math.abs(offset) < CARD_SIZE * (modulosFiltrados.length - CARD_BUFFER);

    const shiftLeft = () => CAN_SHIFT_LEFT && setOffset((prev) => prev + CARD_SIZE);
    const shiftRight = () => CAN_SHIFT_RIGHT && setOffset((prev) => prev - CARD_SIZE);

    return (
        <section className=" w-full bg-slate-100" ref={ref}>
            <div className="relative overflow-hidden p-8">
                <div className="mx-auto max-w-8xl">
                    <p className="mb-6 text-4xl font-semibold text-center">
                        Visita los Módulos disponibles en tu portal
                    </p>
                    <motion.div animate={{ x: offset }} className="flex">
                        {modulosFiltrados.length > 0 ? (
                            modulosFiltrados.map((modulo) => (
                                <Card
                                    key={modulo.modulo_id}
                                    nombre={modulo.nombre}
                                    imagen={modulosData[modulo.modulo_id]?.imagen || "/fondo.jpeg"}
                                    href={modulosData[modulo.modulo_id]?.href || "#"}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 w-full">No hay módulos disponibles</p>
                        )}
                    </motion.div>
                </div>

                <button
                    className="absolute left-0 top-[60%] z-30 rounded-r-xl bg-slate-100/30 p-3 pl-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pl-3"
                    onClick={shiftLeft}
                >
                    <FiChevronLeft aria-label="Izquierda" />
                </button>
                <button
                    className="absolute right-0 top-[60%] z-30 rounded-l-xl bg-slate-100/30 p-3 pr-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pr-3"
                    onClick={shiftRight}
                >
                    <FiChevronRight aria-label="Derecha" />
                </button>
            </div>
        </section>
    );
};

// 🔹 Cada tarjeta de módulo ahora redirige a su página dentro del proyecto
const Card = ({ nombre, imagen, href }: { nombre: string; imagen: string; href: string }) => (
    <a href={href}>
        <div
            className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.08] hover:shadow-xl"
            style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                marginRight: MARGIN,
                backgroundImage: `url(${imagen})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter] hover:backdrop-blur-sm">
                <p className="my-2 text-3xl font-bold text-slate-200">{nombre}</p>
            </div>
        </div>
    </a>
);

export default CardCarrusel;
