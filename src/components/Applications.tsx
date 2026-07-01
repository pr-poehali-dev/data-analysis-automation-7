import Icon from "@/components/ui/icon";

const cards = [
  {
    title: "НА АДМИНИСТРАТОРА",
    description: "Подать заявку на пост администратора сервера. Рассматриваются игроки от 14 лет с онлайном и знанием правил проекта.",
    badge: "ОТКРЫТО",
    badgeColor: "text-green-400 border-green-400",
    titleColor: "text-red-500",
    icon: "Shield",
    iconColor: "text-red-400",
  },
  {
    title: "НА ЛИДЕРА",
    description: "Подать заявку на пост лидера выбранной фракции: государственные структуры, СМИ, ОПГ или военная часть.",
    badge: "ЗАКРЫТО",
    badgeColor: "text-yellow-400 border-yellow-400",
    titleColor: "text-yellow-400",
    icon: "Crown",
    iconColor: "text-yellow-400",
  },
  {
    title: "НА ВОССТАНОВЛЕНИЕ",
    description: "Подать заявку на восстановление в должности. Только для бывших администраторов сервера Maiami RP.",
    badge: "ЗАКРЫТО",
    badgeColor: "text-blue-400 border-blue-400",
    titleColor: "text-blue-400",
    icon: "RotateCcw",
    iconColor: "text-blue-400",
  },
];

export default function Applications() {
  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-24 flex flex-col items-center">
      <p className="text-red-500 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-red-500 inline-block" />
        Заявки на пост администратора и лидера
        <span className="w-8 h-px bg-red-500 inline-block" />
      </p>

      <h2 className="text-white font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-2">
        СИСТЕМА
      </h2>
      <h2 className="text-red-500 font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-8">
        ЗАЯВОК
      </h2>

      <p className="text-neutral-400 text-center max-w-lg mb-16 text-sm md:text-base">
        Выберите тип заявки и заполните анкету для сервера Maiami RP. Мы рассматриваем все заявки в течение 3 дней.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {cards.map((card) => (
          <div
            key={card.title}
            className="relative bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4 group hover:border-neutral-600 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                <Icon name={card.icon} size={22} className={card.iconColor} />
              </div>
              <span className={`text-xs uppercase border px-2 py-1 tracking-widest ${card.badgeColor}`}>
                {card.badge}
              </span>
            </div>

            <h3 className={`font-black text-2xl uppercase leading-tight ${card.titleColor}`}>
              {card.title}
            </h3>

            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {card.description}
            </p>

            <button className={`text-sm uppercase tracking-widest font-bold transition-opacity duration-300 hover:opacity-70 text-left ${card.titleColor}`}>
              Подать заявку »
            </button>

            <div className="absolute bottom-0 right-0 w-12 h-12 opacity-20"
              style={{ background: `linear-gradient(135deg, transparent 50%, currentColor 50%)` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
