export default function Social() {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 py-24">
      <p className="text-red-500 uppercase tracking-widest text-xs mb-12 flex items-center gap-2">
        <span className="w-8 h-px bg-red-500 inline-block" />
        Наши социальные сети
        <span className="w-8 h-px bg-red-500 inline-block" />
      </p>

      <div className="flex flex-wrap gap-8 justify-center">
        <div className="w-72 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #4a9fd4, #2b7ab8)" }}>
          <div className="flex flex-col items-center justify-center px-8 py-12 gap-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f3/VK_Compact_Logo_%282021-present%29.svg"
              alt="ВКонтакте"
              className="w-32 h-32 drop-shadow-xl"
            />
            <p className="text-white font-bold text-2xl">ВКонтакте</p>
            <a
              href="https://vk.ru/maiamigtasampmultipleer"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border-2 border-white text-white font-bold text-lg py-3 rounded-xl text-center hover:bg-white hover:text-blue-500 transition-all duration-300"
            >
              Перейти
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
