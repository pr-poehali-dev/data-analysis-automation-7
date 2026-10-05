import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { adminRequest, CONTENT_KEY, CONTENT_URL, useContent, type NewsItem, type ReviewItem } from "@/lib/content";

const STORAGE_KEY = "admin-password";
const TAGS = ["Новость", "Обновление", "Фича", "Ивент", "Открытие"];
const ICONS = ["Sparkles", "Rocket", "Home", "Trophy", "Megaphone", "Car", "Shield", "Gift"];

const fieldClass = "bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500";
const selectClass = "h-10 w-full rounded-md border border-neutral-700 bg-neutral-800 px-3 text-sm text-white";

function Login({ onLogin }: { onLogin: (password: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch(`${CONTENT_URL}?action=check`, { headers: { "X-Auth-Token": value } });
    setLoading(false);
    if (res.ok) {
      localStorage.setItem(STORAGE_KEY, value);
      onLogin(value);
    } else {
      setError("Неверный пароль");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-neutral-900 border border-neutral-800 p-8 flex flex-col gap-4">
        <h1 className="text-white font-black text-2xl uppercase">Вход в админку</h1>
        <Input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Пароль"
          className={fieldClass}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <Button type="submit" disabled={loading || !value} className="bg-red-600 hover:bg-red-700 text-white uppercase">
          {loading ? "Проверяю..." : "Войти"}
        </Button>
      </form>
    </div>
  );
}

function Panel({ password, onLogout }: { password: string; onLogout: () => void }) {
  const { data } = useContent();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [ip, setIp] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [forumUrl, setForumUrl] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState({ title: "", description: "", tag: "Новость", icon: "Sparkles", news_date: "" });
  const [reviewForm, setReviewForm] = useState({ name: "", role: "", text: "", rating: 5 });
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);

  const run = async (fn: () => Promise<unknown>, successText: string) => {
    try {
      await fn();
      await queryClient.invalidateQueries({ queryKey: CONTENT_KEY });
      toast({ title: successText });
    } catch (e) {
      toast({ title: (e as Error).message, variant: "destructive" });
    }
  };

  const saveSettings = () =>
    run(
      () =>
        adminRequest("PUT", "settings", password, {
          server_ip: ip ?? data?.settings.server_ip ?? "",
          download_url: downloadUrl ?? data?.settings.download_url ?? "",
          forum_url: forumUrl ?? data?.settings.forum_url ?? "",
        }),
      "Настройки сохранены",
    );

  const emptyNews = { title: "", description: "", tag: "Новость", icon: "Sparkles", news_date: "" };
  const emptyReview = { name: "", role: "", text: "", rating: 5 };

  const saveNews = () =>
    run(async () => {
      if (editingNewsId) {
        await adminRequest("PUT", "news", password, newsForm, editingNewsId);
      } else {
        await adminRequest("POST", "news", password, newsForm);
      }
      setNewsForm(emptyNews);
      setEditingNewsId(null);
    }, editingNewsId ? "Новость обновлена" : "Новость добавлена");

  const saveReview = () =>
    run(async () => {
      if (editingReviewId) {
        await adminRequest("PUT", "review", password, reviewForm, editingReviewId);
      } else {
        await adminRequest("POST", "review", password, reviewForm);
      }
      setReviewForm(emptyReview);
      setEditingReviewId(null);
    }, editingReviewId ? "Отзыв обновлён" : "Отзыв добавлен");

  const startEditNews = (n: NewsItem) => {
    setEditingNewsId(n.id);
    setNewsForm({ title: n.title, description: n.description, tag: n.tag, icon: n.icon, news_date: n.news_date });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEditReview = (r: ReviewItem) => {
    setEditingReviewId(r.id);
    setReviewForm({ name: r.name, role: r.role, text: r.text, rating: r.rating });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelNews = () => {
    setEditingNewsId(null);
    setNewsForm(emptyNews);
  };

  const cancelReview = () => {
    setEditingReviewId(null);
    setReviewForm(emptyReview);
  };

  const removeItem = (action: "news" | "review", id: number) => {
    if (!window.confirm("Удалить запись?")) return;
    run(() => adminRequest("DELETE", action, password, undefined, id), "Удалено");
  };

  const today = new Date().toLocaleDateString("ru-RU");

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h1 className="font-black text-3xl uppercase">Админ-панель</h1>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="bg-transparent border-neutral-700 text-white hover:bg-neutral-800 hover:text-white">
              <a href="/">На сайт</a>
            </Button>
            <Button onClick={onLogout} variant="outline" className="bg-transparent border-neutral-700 text-white hover:bg-neutral-800 hover:text-white">
              Выйти
            </Button>
          </div>
        </div>

        <section className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4">
          <h2 className="font-bold text-xl uppercase">Настройки сайта</h2>
          <div className="flex flex-col gap-3">
            <label className="text-neutral-400 text-sm">IP сервера</label>
            <Input
              value={ip ?? data?.settings.server_ip ?? ""}
              onChange={(e) => setIp(e.target.value)}
              placeholder="195.18.27.226:2498"
              className={`${fieldClass} max-w-xs`}
            />
            <label className="text-neutral-400 text-sm">Ссылка на скачивание игры</label>
            <Input
              value={downloadUrl ?? data?.settings.download_url ?? ""}
              onChange={(e) => setDownloadUrl(e.target.value)}
              placeholder="https://..."
              className={fieldClass}
            />
            <label className="text-neutral-400 text-sm">Ссылка на форум</label>
            <Input
              value={forumUrl ?? data?.settings.forum_url ?? ""}
              onChange={(e) => setForumUrl(e.target.value)}
              placeholder="https://..."
              className={fieldClass}
            />
          </div>
          <Button onClick={saveSettings} className="bg-red-600 hover:bg-red-700 text-white self-start">
            Сохранить
          </Button>
        </section>

        <section className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4">
          <h2 className="font-bold text-xl uppercase">Новости</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              value={newsForm.title}
              onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
              placeholder="Заголовок"
              className={fieldClass}
            />
            <Input
              value={newsForm.news_date}
              onChange={(e) => setNewsForm({ ...newsForm, news_date: e.target.value })}
              placeholder={`Дата, например ${today}`}
              className={fieldClass}
            />
            <select value={newsForm.tag} onChange={(e) => setNewsForm({ ...newsForm, tag: e.target.value })} className={selectClass}>
              {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={newsForm.icon} onChange={(e) => setNewsForm({ ...newsForm, icon: e.target.value })} className={selectClass}>
              {ICONS.map((i) => <option key={i} value={i}>Иконка: {i}</option>)}
            </select>
          </div>
          <Textarea
            value={newsForm.description}
            onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
            placeholder="Текст новости"
            className={fieldClass}
          />
          <div className="flex gap-3">
            <Button
              onClick={saveNews}
              disabled={!newsForm.title || !newsForm.description || !newsForm.news_date}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {editingNewsId ? "Сохранить изменения" : "Добавить новость"}
            </Button>
            {editingNewsId && (
              <Button onClick={cancelNews} variant="outline" className="bg-transparent border-neutral-700 text-white hover:bg-neutral-800 hover:text-white">
                Отмена
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-neutral-800">
            {data?.news.map((n) => (
              <div key={n.id} className="flex items-center justify-between gap-4 bg-neutral-800 px-4 py-3">
                <div className="min-w-0">
                  <p className="font-bold truncate">{n.title}</p>
                  <p className="text-neutral-400 text-xs">{n.news_date} · {n.tag}</p>
                </div>
                <div className="flex shrink-0">
                  <Button onClick={() => startEditNews(n)} variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-neutral-700">
                    <Icon name="Pencil" size={16} className="mr-1" />
                    Редактировать
                  </Button>
                  <Button onClick={() => removeItem("news", n.id)} variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-neutral-700">
                    <Icon name="Trash2" size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4">
          <h2 className="font-bold text-xl uppercase">Отзывы</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <Input
              value={reviewForm.name}
              onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
              placeholder="Имя игрока"
              className={fieldClass}
            />
            <Input
              value={reviewForm.role}
              onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
              placeholder="Подпись, например: Игрок с 2024"
              className={fieldClass}
            />
            <select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })} className={selectClass}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>Оценка: {r}</option>)}
            </select>
          </div>
          <Textarea
            value={reviewForm.text}
            onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
            placeholder="Текст отзыва"
            className={fieldClass}
          />
          <div className="flex gap-3">
            <Button
              onClick={saveReview}
              disabled={!reviewForm.name || !reviewForm.text}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {editingReviewId ? "Сохранить изменения" : "Добавить отзыв"}
            </Button>
            {editingReviewId && (
              <Button onClick={cancelReview} variant="outline" className="bg-transparent border-neutral-700 text-white hover:bg-neutral-800 hover:text-white">
                Отмена
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-neutral-800">
            {data?.reviews.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-4 bg-neutral-800 px-4 py-3">
                <div className="min-w-0">
                  <p className="font-bold truncate">{r.name} · {r.rating}/5</p>
                  <p className="text-neutral-400 text-xs truncate">{r.text}</p>
                </div>
                <div className="flex shrink-0">
                  <Button onClick={() => startEditReview(r)} variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-neutral-700">
                    <Icon name="Pencil" size={16} className="mr-1" />
                    Редактировать
                  </Button>
                  <Button onClick={() => removeItem("review", r.id)} variant="ghost" size="icon" className="text-red-400 hover:text-red-300 hover:bg-neutral-700">
                    <Icon name="Trash2" size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function Admin() {
  const [password, setPassword] = useState(() => localStorage.getItem(STORAGE_KEY) ?? "");

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPassword("");
  };

  return password ? <Panel password={password} onLogout={logout} /> : <Login onLogin={setPassword} />;
}
