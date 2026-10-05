import { useQuery } from "@tanstack/react-query";
import func2url from "../../backend/func2url.json";

export const CONTENT_URL = func2url.content;

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  tag: string;
  icon: string;
  news_date: string;
}

export interface ReviewItem {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface SiteContent {
  news: NewsItem[];
  reviews: ReviewItem[];
  settings: { server_ip?: string; download_url?: string; forum_url?: string };
}

export const CONTENT_KEY = ["site-content"];

export async function fetchContent(): Promise<SiteContent> {
  const res = await fetch(CONTENT_URL);
  return res.json();
}

export function useContent() {
  return useQuery({ queryKey: CONTENT_KEY, queryFn: fetchContent });
}

export async function adminRequest(
  method: string,
  action: string,
  password: string,
  body?: unknown,
  id?: number,
) {
  const query = `?action=${action}${id ? `&id=${id}` : ""}`;
  const res = await fetch(`${CONTENT_URL}${query}`, {
    method,
    headers: { "Content-Type": "application/json", "X-Auth-Token": password },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(res.status === 401 ? "Неверный пароль" : "Ошибка сохранения");
  return res.json();
}