import Icon from "@/components/ui/icon";
import { useContent } from "@/lib/content";

const TAG_COLORS: Record<string, string> = {
  Открытие: "text-green-400 border-green-400",
  Обновление: "text-red-400 border-red-400",
  Фича: "text-yellow-400 border-yellow-400",
  Ивент: "text-blue-400 border-blue-400",
};
const DEFAULT_TAG_COLOR = "text-purple-400 border-purple-400";

export default function News() {
  const { data } = useContent();
  const news = data?.news ?? [];

  return (
    <div className="bg-neutral-950 px-6 py-24 flex flex-col items-center">
      <p className="text-red-500 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-red-500 inline-block" />
        Что нового
        <span className="w-8 h-px bg-red-500 inline-block" />
      </p>

      <h2 className="text-white font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-2">
        НОВОСТИ И
      </h2>
      <h2 className="text-red-500 font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-16">
        ОБНОВЛЕНИЯ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {news.map((item) => (
          <div
            key={item.id}
            className="relative bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4 hover:border-neutral-600 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                <Icon name={item.icon} size={22} className="text-red-400" />
              </div>
              <span className={`text-xs uppercase border px-2 py-1 tracking-widest ${TAG_COLORS[item.tag] ?? DEFAULT_TAG_COLOR}`}>
                {item.tag}
              </span>
            </div>

            <p className="text-neutral-500 text-xs uppercase tracking-widest">{item.news_date}</p>

            <h3 className="text-white font-black text-xl uppercase leading-tight">
              {item.title}
            </h3>

            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}