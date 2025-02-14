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

const CardCarrusel = () => {
    const [ref, { width }] = useMeasure();
    const [offset, setOffset] = useState(0);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        console.log("✅ CardCarrusel.tsx se está ejecutando en el cliente");
        setIsClient(true);
    }, []);

    console.log("🔹 items en CardCarrusel:", JSON.stringify(items, null, 2));

    if (!isClient) {
        console.log("🚫 CardCarrusel aún no está en el cliente, esperando...");
        return <div>Cargando componente...</div>;
    }

    console.log("🎥 Renderizando CardCarrusel...");

    const CARD_BUFFER = width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;
    const CAN_SHIFT_LEFT = offset < 0;
    const CAN_SHIFT_RIGHT = Math.abs(offset) < CARD_SIZE * (items.length - CARD_BUFFER);

    const shiftLeft = () => CAN_SHIFT_LEFT && setOffset((prev) => prev + CARD_SIZE);
    const shiftRight = () => CAN_SHIFT_RIGHT && setOffset((prev) => prev - CARD_SIZE);

    return (
        <section className="bg-slate-100" ref={ref}>
            <div className="relative overflow-hidden p-8">
                <div className="mx-auto max-w-8xl">
                    <p className="mb-6 text-4xl font-semibold text-center">
                        Visita los Módulos disponibles en tu portal
                    </p>
                    <motion.div animate={{ x: offset }} className="flex">
                        {items.map((item) => (
                            <Card key={item.id} {...item} />
                        ))}
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

const Card = ({ url, title, href }: ItemType) => (
    <a href={href}>
        <div
            className="relative shrink-0 cursor-pointer rounded-2xl bg-white shadow-md transition-all hover:scale-[1.08] hover:shadow-xl"
            style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                marginRight: MARGIN,
                backgroundImage: `url(${url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <div className="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-black/90 via-black/60 to-black/0 p-6 text-white transition-[backdrop-filter] hover:backdrop-blur-sm">
                <p className="my-2 text-3xl font-bold text-slate-200">{title}</p>
            </div>
        </div>
    </a>
);

export default CardCarrusel;

type ItemType = {
    id: number;
    url: string;
    title: string;
    href: string;
};

// 🔹 Items de la galería
const items: ItemType[] = [
    { id: 1, url: "/fondo.jpeg", title: "Configuración", href: "/configuracion" },
    { id: 2, url: "/labores.jpeg", title: "Tareo Campo", href: "/tareo-campo" },
    { id: 3, url: "/cosecha.jpeg", title: "Cosecha", href: "/cosecha" },
    { id: 4, url: "/calidad.jpeg", title: "Calidad", href: "/calidad" },
    { id: 5, url: "/sanidad.jpeg", title: "Sanidad", href: "/sanidad" },
    { id: 6, url: "/maq.jpeg", title: "Maquinarias", href: "/maquinarias" },
];








