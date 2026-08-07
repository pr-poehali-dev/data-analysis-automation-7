import json
import socket
import struct


SERVER_IP = '185.207.214.14'
SERVER_PORT = 4825


def query_samp_server(ip: str, port: int, timeout: float = 3.0) -> dict:
    '''Отправляет UDP-запрос по протоколу SAMP query и возвращает players/maxplayers/hostname/online'''
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.settimeout(timeout)
    try:
        packet = b'SAMP' + socket.inet_aton(ip) + struct.pack('<H', port) + b'i'
        sock.sendto(packet, (ip, port))
        data, _ = sock.recvfrom(2048)

        offset = 11
        hostname_len = struct.unpack('<I', data[offset:offset + 4])[0]
        offset += 4
        hostname = data[offset:offset + hostname_len].decode('utf-8', errors='ignore')
        offset += hostname_len

        gamemode_len = struct.unpack('<I', data[offset:offset + 4])[0]
        offset += 4
        offset += gamemode_len

        language_len = struct.unpack('<I', data[offset:offset + 4])[0]
        offset += 4
        offset += language_len

        players = struct.unpack('<H', data[6:8])[0]
        maxplayers = struct.unpack('<H', data[8:10])[0]

        return {
            'online': True,
            'players': players,
            'maxplayers': maxplayers,
            'hostname': hostname,
        }
    finally:
        sock.close()


def handler(event: dict, context) -> dict:
    '''Возвращает количество игроков онлайн на SAMP-сервере Maiami RP'''
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }

    try:
        result = query_samp_server(SERVER_IP, SERVER_PORT)
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(result),
        }
    except Exception as e:
        print(f'SAMP query failed: {type(e).__name__}: {e}')
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'online': False, 'players': 0, 'maxplayers': 0, 'hostname': ''}),
        }