import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="/images/mountain-landscape.jpg"
          alt="Mountain landscape"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-tight">
          Присоединяйся к нам прямо сейчас
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto opacity-90">
          и покажи, на что ты способен
        </p>
        <button className="mt-10 bg-white text-black border border-white px-8 py-3 text-sm uppercase tracking-wide transition-all duration-300 hover:bg-transparent hover:text-white cursor-pointer">
          Начать играть
        </button>
      </div>
    </div>
  );
}