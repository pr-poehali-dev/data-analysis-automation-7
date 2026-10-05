import Icon from "@/components/ui/icon";
import CopyIp from "@/components/CopyIp";
import { useContent } from "@/lib/content";

export default function HowToStart() {
  const { data } = useContent();
  const ip = data?.settings.server_ip ?? "";
  const downloadUrl = data?.settings.download_url ?? "#";

  const steps = [
    {
      icon: "Download",
      title: "Скачай игру",
      text: "Нажми кнопку ниже и дождись загрузки архива с игрой.",
    },
    {
      icon: "FolderOpen",
      title: "Установи",
      text: "Распакуй архив в удобную папку и запусти установочный файл или лаунчер из неё.",
    },
    {
      icon: "Keyboard",
      title: "Введи IP",
      text: "Запусти игру, открой список серверов или прямое подключение и вставь адрес сервера.",
    },
    {
      icon: "Gamepad2",
      title: "Заходи на сервер",
      text: "Придумай ник и пароль, зарегистрируйся и начинай свою историю в городе.",
    },
  ];

  return (
    <div className="bg-neutral-950 px-6 py-24 flex flex-col items-center">
      <p className="text-red-500 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
        <span className="w-8 h-px bg-red-500 inline-block" />
        Для новичков
        <span className="w-8 h-px bg-red-500 inline-block" />
      </p>

      <h2 className="text-white font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-2">
        КАК НАЧАТЬ
      </h2>
      <h2 className="text-red-500 font-black text-5xl md:text-7xl uppercase text-center leading-tight mb-16">
        ИГРАТЬ
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4 hover:border-neutral-600 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                <Icon name={step.icon} size={22} className="text-red-400" />
              </div>
              <span className="text-neutral-700 font-black text-4xl">{index + 1}</span>
            </div>
            <h3 className="text-white font-black text-xl uppercase leading-tight">{step.title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <span className="text-neutral-400 text-sm uppercase tracking-widest">IP сервера:</span>
          <span className="text-white font-bold select-all">{ip}</span>
          {ip && <CopyIp ip={ip} />}
        </div>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest px-10 py-4 text-sm transition-all duration-300 inline-block"
        >
          Скачать игру
        </a>
      </div>
    </div>
  );
}
