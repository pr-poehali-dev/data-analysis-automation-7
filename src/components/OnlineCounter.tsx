import { useEffect, useState } from "react";

const BASE = 87;

export default function OnlineCounter() {
  const [count, setCount] = useState(BASE);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return Math.min(140, Math.max(60, next));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
      </span>
      <span className="text-white text-sm font-bold">{count}</span>
      <span className="text-white/60 text-xs uppercase tracking-wide">онлайн</span>
    </div>
  );
}
