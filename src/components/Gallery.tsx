import { useState } from "react";
import Icon from "@/components/ui/icon";

const screenshots = [
  {
    src: "https://cdn.poehali.dev/projects/d8103abd-0f83-4992-841c-f7e17ff33ad2/files/6cd0ca83-d748-4015-8534-70a08da72427.jpg",
    title: "Городская улица",
  },
  {
    src: "https://cdn.poehali.dev/projects/d8103abd-0f83-4992-841c-f7e17ff33ad2/files/1c1ed50e-ffcb-451f-bd41-ff66eb8089fb.jpg",
    title: "Пустынное шоссе",
  },
  {
    src: "https://cdn.poehali.dev/projects/d8103abd-0f83-4992-841c-f7e17ff33ad2/files/29bde185-8106-4a4c-90e2-15a9c10a9c1a.jpg",
    title: "Ранчо",
  },
  {
    src: "https://cdn.poehali.dev/projects/d8103abd-0f83-4992-841c-f7e17ff33ad2/files/23f254be-9942-4f3c-9239-e4adfd7649ff.jpg",
    title: "Погоня",
  },
  {
    src: "https://cdn.poehali.dev/projects/d8103abd-0f83-4992-841c-f7e17ff33ad2/files/e1cd80e8-b128-4531-9288-4d303100b02e.jpg",
    title: "Автомобильная тусовка",
  },
  {
    src: "https://cdn.poehali.dev/projects/d8103abd-0f83-4992-841c-f7e17ff33ad2/files/e3d31b64-f8b2-4288-b8b1-3a095b2ad3de.jpg",
    title: "Панорама города",
  },
];

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div id="gallery" className="bg-neutral-950 px-6 py-24 flex flex-col items-center">
      <p className="text-red-500 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-red-500 inline-block" />
        Скриншоты игрового процесса
        <span className="w-8 h-px bg-red-500 inline-block" />
      </p>

      <h2 className="text-white font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-2">
        ГАЛЕРЕЯ
      </h2>
      <h2 className="text-red-500 font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-16">
        СЕРВЕРА
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {screenshots.map((shot, i) => (
          <button
            key={shot.src}
            onClick={() => setActive(i)}
            className="relative group overflow-hidden aspect-video bg-neutral-900 border border-neutral-800 hover:border-red-500 transition-all duration-300"
          >
            <img
              src={shot.src}
              alt={shot.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
              <p className="text-white font-bold uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {shot.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors"
            onClick={() => setActive(null)}
          >
            <Icon name="X" size={32} />
          </button>
          <img
            src={screenshots[active].src}
            alt={screenshots[active].title}
            className="max-w-full max-h-[85vh] object-contain border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}