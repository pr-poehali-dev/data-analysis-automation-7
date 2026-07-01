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
          alt="Miami RP background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <div className="relative z-10 text-left px-8 md:px-16 w-full max-w-6xl">
        <p className="text-white uppercase tracking-widest text-sm mb-4 opacity-70">
          Добро пожаловать
        </p>
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tight text-white uppercase mb-2">
          MAIAMI
        </h1>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight text-red-600 uppercase mb-8">
          RP
        </h2>
        <p className="text-white/80 text-base md:text-lg max-w-md mb-10">
          Вас ждёт увлекательный игровой процесс с элементами ролевой игры.<br />
          Территории, бои, покупка домов и машин — заходи и покажи, на что ты способен!
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest px-10 py-4 text-sm transition-all duration-300 cursor-pointer">
          Присоединяйся к нам
        </button>
      </div>
    </div>
  );
}
