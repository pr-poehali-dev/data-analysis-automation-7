import Icon from "@/components/ui/icon";

const reviews = [
  {
    name: "Артём В.",
    role: "Игрок с 2024 года",
    text: "Играю уже второй год — сервер живой, админы адекватные, а фракционка реально затягивает. Один из лучших RP-проектов, что я пробовал.",
    rating: 5,
  },
  {
    name: "Мария К.",
    role: "Лидер фракции",
    text: "Отличное комьюнити и постоянные обновления. Система недвижимости и бизнесов сделана с душой, скучать не приходится.",
    rating: 5,
  },
  {
    name: "Данил С.",
    role: "Игрок с 2025 года",
    text: "Понравилась атмосфера Майами — графика, музыка, детали города. Заявку на админа рассмотрели быстро и честно.",
    rating: 4,
  },
];

export default function Reviews() {
  return (
    <div className="bg-neutral-950 px-6 py-24 flex flex-col items-center">
      <p className="text-red-500 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-red-500 inline-block" />
        Мнение игроков
        <span className="w-8 h-px bg-red-500 inline-block" />
      </p>

      <h2 className="text-white font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-2">
        ОТЗЫВЫ
      </h2>
      <h2 className="text-red-500 font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-16">
        ИГРОКОВ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="relative bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4 hover:border-neutral-600 transition-all duration-300"
          >
            <Icon name="Quote" size={28} className="text-red-500/40" />

            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-700"}
                />
              ))}
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed flex-1">
              {review.text}
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
              <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-red-400 font-bold text-sm">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-bold text-sm">{review.name}</p>
                <p className="text-neutral-500 text-xs">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
