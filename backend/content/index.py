import json
import os
import hmac
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p24942269_data_analysis_automa')

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}


def respond(status: int, data) -> dict:
    return {'statusCode': status, 'headers': HEADERS, 'body': json.dumps(data, ensure_ascii=False)}


def esc(value) -> str:
    return "'" + str(value).replace("'", "''") + "'"


def is_admin(event: dict) -> bool:
    headers = event.get('headers') or {}
    token = ''
    for key, value in headers.items():
        if key.lower() == 'x-auth-token':
            token = value or ''
    password = os.environ.get('ADMIN_PASSWORD', '')
    return bool(password) and hmac.compare_digest(token.encode(), password.encode())


def fetch_all(cur, query: str) -> list:
    cur.execute(query)
    cols = [c[0] for c in cur.description]
    return [dict(zip(cols, row)) for row in cur.fetchall()]


def handler(event: dict, context) -> dict:
    """Контент сайта: новости, отзывы и IP сервера. Чтение открыто, изменение только с паролем администратора."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    method = event.get('httpMethod')
    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')

    if method == 'GET' and action == 'check':
        return respond(200, {'ok': is_admin(event)}) if is_admin(event) else respond(401, {'error': 'Неверный пароль'})

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    conn.autocommit = True
    cur = conn.cursor()

    try:
        if method == 'GET':
            news = fetch_all(cur, f"SELECT id, title, description, tag, icon, news_date FROM {SCHEMA}.news ORDER BY id DESC")
            reviews = fetch_all(cur, f"SELECT id, name, role, text, rating FROM {SCHEMA}.reviews ORDER BY id DESC")
            settings = fetch_all(cur, f"SELECT key, value FROM {SCHEMA}.settings")
            return respond(200, {
                'news': news,
                'reviews': reviews,
                'settings': {s['key']: s['value'] for s in settings},
            })

        if not is_admin(event):
            return respond(401, {'error': 'Неверный пароль'})

        body = json.loads(event.get('body') or '{}')

        if method == 'POST' and action == 'news':
            cur.execute(
                f"INSERT INTO {SCHEMA}.news (title, description, tag, icon, news_date) VALUES "
                f"({esc(body.get('title', ''))}, {esc(body.get('description', ''))}, {esc(body.get('tag') or 'Новость')}, "
                f"{esc(body.get('icon') or 'Sparkles')}, {esc(body.get('news_date', ''))}) RETURNING id"
            )
            return respond(200, {'id': cur.fetchone()[0]})

        if method == 'POST' and action == 'review':
            rating = max(1, min(5, int(body.get('rating') or 5)))
            cur.execute(
                f"INSERT INTO {SCHEMA}.reviews (name, role, text, rating) VALUES "
                f"({esc(body.get('name', ''))}, {esc(body.get('role', ''))}, {esc(body.get('text', ''))}, {rating}) RETURNING id"
            )
            return respond(200, {'id': cur.fetchone()[0]})

        if method == 'PUT' and action == 'settings':
            cur.execute(
                f"INSERT INTO {SCHEMA}.settings (key, value) VALUES ('server_ip', {esc(body.get('server_ip', ''))}) "
                f"ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value"
            )
            return respond(200, {'ok': True})

        if method == 'DELETE' and action in ('news', 'review'):
            table = 'news' if action == 'news' else 'reviews'
            cur.execute(f"DELETE FROM {SCHEMA}.{table} WHERE id = {int(params.get('id', 0))}")
            return respond(200, {'ok': True})

        return respond(400, {'error': 'Неизвестное действие'})
    finally:
        cur.close()
        conn.close()
