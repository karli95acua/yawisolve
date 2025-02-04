import { motion } from "framer-motion";
import { useState } from "react";
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

const CardCarousel = () => {
    const [ref, { width }] = useMeasure();
    const [offset, setOffset] = useState(0);

    const CARD_BUFFER =
        width > BREAKPOINTS.lg ? 3 : width > BREAKPOINTS.sm ? 2 : 1;

    const CAN_SHIFT_LEFT = offset < 0;

    const CAN_SHIFT_RIGHT =
        Math.abs(offset) < CARD_SIZE * (items.length - CARD_BUFFER);

    const shiftLeft = () => {
        if (!CAN_SHIFT_LEFT) {
        return;
        }
        setOffset((pv) => (pv += CARD_SIZE));
    };

    const shiftRight = () => {
        if (!CAN_SHIFT_RIGHT) {
        return;
        }
        setOffset((pv) => (pv -= CARD_SIZE));
    };

    return (
    <section className="bg-slate-100" ref={ref}>
        <div className="relative overflow-hidden p-8">
            {/* CARDS */}
            <div className="mx-auto max-w-8xl">
            <p className="mb-6 text-2xl font-semibold">
            <span className="text-slate-500 flex justify-center items-center h-20">Visita los Módulos disponibles en tu portal</span>
            </p>
            <motion.div
                animate={{
                x: offset,
                }}
                className="flex"
            >
                {items.map((item) => {
                return <Card key={item.id} {...item} />;
                })}
            </motion.div>
            </div>

            {/* BUTTONS */}
            <>
            <motion.button
                initial={false}
                animate={{
                x: CAN_SHIFT_LEFT ? "0%" : "-100%",
                }}
                className="absolute left-0 top-[60%] z-30 rounded-r-xl bg-slate-100/30 p-3 pl-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pl-3"
                onClick={shiftLeft}
            >
                <FiChevronLeft />
            </motion.button>
            <motion.button
                initial={false}
                animate={{
                x: CAN_SHIFT_RIGHT ? "0%" : "100%",
                }}
                className="absolute right-0 top-[60%] z-30 rounded-l-xl bg-slate-100/30 p-3 pr-2 text-4xl text-white backdrop-blur-sm transition-[padding] hover:pr-3"
                onClick={shiftRight}
            >
                <FiChevronRight />
            </motion.button>
            </>
        </div>
        </section>
    );
};

const Card = ({ url, title, description }: ItemType) => {
    return (
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
            <p className="my-2 text-3xl font-bold">{title}</p>
            <p className="text-lg text-slate-300">{description}</p>
        </div>
        </div>
    );
};

export default CardCarousel;

type ItemType = {
    id: number;
    url: string;
    title: string;
    description: string;
};

const items: ItemType[] = [
    {
        id: 1,
        url: "/fondo.jpeg",
        title: "Configuración",
        description:
        "Maestros de configuración: Estructura Agrícola, Trabajadores, Actividades y más.",
    },
    {
        id: 2,
        url: "/fondo.jpeg",
        title: "Tareo Campo",
        description:
        "Configuración de grupos, principales funcionalidades de tus planillas de campo, reportes y todo sobre registro de labores.",
    },
    {
        id: 3,
        url: "/cosecha.jpeg",
        title: "Cosecha",
        description:
        "Formatos, configuración de cosecha, registro de envases y cosecha diaria.",
    },
    {
        id: 4,
        url: "/calidad.jpeg",
        title: "Calidad",
        description:
        "Configuración de evaluaciones, umbrales y fórmulas para calidad de tus procesos.",
    },
    {
        id: 5,
        url: "/fondo.jpeg",
        title: "Sanidad",
        description:
        "Evaluaciones de plagas y programaciones de aplicaciones en un solo lugar.",
    },
    {
        id: 6,
        url: "/fondo.jpeg",
        title: "Maquinarias",
        description:
        "Configuración de maquinarias, tarifas y órdenes de trabajo.",
    }
];

