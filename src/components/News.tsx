import Icon from "@/components/ui/icon";

const news = [
  {
    date: "05.05.2024",
    title: "Открытие проекта Maiami RP",
    description: "Сервер официально открыл свои двери для игроков! Добро пожаловать в город, где начинается твоя история.",
    icon: "Rocket",
    tag: "Открытие",
    tagColor: "text-green-400 border-green-400",
  },
  {
    date: "05.08.2026",
    title: "Обновление 3.2: новые фракции",
    description: "Добавлены две новые государственные фракции и обновлена система назначения лидеров.",
    icon: "Sparkles",
    tag: "Обновление",
    tagColor: "text-red-400 border-red-400",
  },
  {
    date: "28.07.2026",
    title: "Новая система недвижимости",
    description: "Переработана покупка домов и вилл: добавлены аукционы и персональная охрана territorий.",
    icon: "Home",
    tag: "Фича",
    tagColor: "text-yellow-400 border-yellow-400",
  },
  {
    date: "15.07.2026",
    title: "Ивент выходного дня",
    description: "В эти выходные — гонки на побережье с призами для победителей. Регистрация на форуме.",
    icon: "Trophy",
    tag: "Ивент",
    tagColor: "text-blue-400 border-blue-400",
  },
];

export default function News() {
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
            key={item.title}
            className="relative bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4 hover:border-neutral-600 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                <Icon name={item.icon} size={22} className="text-red-400" />
              </div>
              <span className={`text-xs uppercase border px-2 py-1 tracking-widest ${item.tagColor}`}>
                {item.tag}
              </span>
            </div>

            <p className="text-neutral-500 text-xs uppercase tracking-widest">{item.date}</p>

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