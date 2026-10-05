CREATE TABLE IF NOT EXISTS t_p24942269_data_analysis_automa.news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tag TEXT NOT NULL DEFAULT 'Новость',
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  news_date TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p24942269_data_analysis_automa.reviews (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p24942269_data_analysis_automa.settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT INTO t_p24942269_data_analysis_automa.settings (key, value) VALUES ('server_ip', '195.18.27.226:2498') ON CONFLICT (key) DO NOTHING;

INSERT INTO t_p24942269_data_analysis_automa.news (title, description, tag, icon, news_date) VALUES
('Открытие проекта Maiami RP', 'Сервер официально открыл свои двери для игроков! Добро пожаловать в город, где начинается твоя история.', 'Открытие', 'Rocket', '05.05.2024'),
('Обновление 3.2: новые фракции', 'Добавлены две новые государственные фракции и обновлена система назначения лидеров.', 'Обновление', 'Sparkles', '05.08.2026'),
('Новая система недвижимости', 'Переработана покупка домов и вилл: добавлены аукционы и персональная охрана территорий.', 'Фича', 'Home', '28.07.2026'),
('Ивент выходного дня', 'В эти выходные — гонки на побережье с призами для победителей. Регистрация на форуме.', 'Ивент', 'Trophy', '15.07.2026');

INSERT INTO t_p24942269_data_analysis_automa.reviews (name, role, text, rating) VALUES
('Артём В.', 'Игрок с 2024 года', 'Играю уже второй год — сервер живой, админы адекватные, а фракционка реально затягивает. Один из лучших RP-проектов, что я пробовал.', 5),
('Мария К.', 'Лидер фракции', 'Отличное комьюнити и постоянные обновления. Система недвижимости и бизнесов сделана с душой, скучать не приходится.', 5),
('Данил С.', 'Игрок с 2025 года', 'Понравилась атмосфера Майами — графика, музыка, детали города. Заявку на админа рассмотрели быстро и честно.', 4);