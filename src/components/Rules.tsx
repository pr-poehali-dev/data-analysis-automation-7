import Icon from "@/components/ui/icon";

const rules = [
  { icon: "Users", title: "Уважай игроков", text: "Оскорбления, травля и неуважение к игрокам и администрации запрещены." },
  { icon: "Drama", title: "Играй по роли", text: "Веди себя как твой персонаж в реальной жизни. Не используй знания, которые персонаж знать не может." },
  { icon: "Swords", title: "Никакого DM", text: "Убивать игроков без причины и ролевой ситуации нельзя." },
  { icon: "Car", title: "Без езды по людям", text: "Намеренно давить игроков транспортом и мешать им — запрещено." },
  { icon: "ShieldAlert", title: "Никаких читов", text: "Использование читов, багов и сторонних программ приводит к блокировке." },
  { icon: "Megaphone", title: "Чистый чат", text: "Не спамь, не рекламируй другие проекты и не флуди в общем чате." },
];

export default function Rules() {
  return (
    <div id="rules" className="bg-neutral-950 px-6 py-24 flex flex-col items-center">
      <p className="text-red-500 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-red-500 inline-block" />
        Порядок на сервере
        <span className="w-8 h-px bg-red-500 inline-block" />
      </p>

      <h2 className="text-white font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-2">
        ПРАВИЛА
      </h2>
      <h2 className="text-red-500 font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-16">
        СЕРВЕРА
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {rules.map((rule, index) => (
          <div
            key={rule.title}
            className="relative bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4 hover:border-neutral-600 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                <Icon name={rule.icon} size={22} className="text-red-400" />
              </div>
              <span className="text-neutral-700 font-black text-3xl">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="text-white font-black text-xl uppercase leading-tight">{rule.title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{rule.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
