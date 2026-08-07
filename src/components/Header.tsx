import OnlineCounter from "@/components/OnlineCounter";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-sm uppercase tracking-wide font-bold">Maiami RP</div>
        <div className="flex items-center gap-6">
          <OnlineCounter />
          <a
            href="#gallery"
            className="text-white/80 hover:text-white text-sm uppercase tracking-wide font-bold transition-colors duration-300"
          >
            Галерея
          </a>
        </div>
      </div>
    </header>
  );
}