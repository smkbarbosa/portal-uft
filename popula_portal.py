import json
import requests
import sys


base_url = 'http://localhost:8080/Plone/++api++'
username = 'admin'
password = 'admin'

headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}


def auth():
    # Authenticate
    response = requests.post(f'{base_url}/@login', headers=headers,
                             json={'login': username, 'password': password})

    if response.status_code == 200:
        token = response.json()['token']
        headers['Authorization'] = f'Bearer {token}'
        print(f'Autenticado! Token: {token}')
    else:
        raise ValueError("Usuário ou senha inválidos")


def create_doc():
    create = requests.post(f'{base_url}/', headers=headers,
                           json={
                                '@type': 'Document',
                               'id': 'gurupi',
                               'title': 'Gurupi',
                               'description': 'Cria campus via API',
                               'login': username, 'password': password})

    publish = requests.post(f'{base_url}/gurupi/@workflow/publish', headers=headers,
                            auth=(username, password))

    if create.status_code == 200:
        token = create.json()['token']
        print(f'Conteúdo criado com sucesso!')
    else:
        print(create.status_code)
        raise ValueError('Erro ao criar conteúdo')

    if publish.status_code == 200:
        print(f'Conteúdo publicado com sucesso')
    else:
        raise ValueError('Erro ao publicar conteúdo')


if __name__ == '__main__':
    create_doc()
