import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function CopyIp({ ip }: { ip: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-xs uppercase tracking-widest px-3 py-1.5 transition-colors duration-300"
    >
      <Icon name={copied ? "Check" : "Copy"} size={14} />
      {copied ? "Скопировано" : "Копировать"}
    </button>
  );
}
