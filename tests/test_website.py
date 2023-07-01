import requests

PORT = 3000


def test_health():
    response = requests.get(f'http://localhost:{PORT}/')
    assert response.status_code == 200


def test_api_whoami_without_session():
    response = requests.get(f'http://localhost:{PORT}/api/auth/whoami')
    assert response.json() == {"detail": "No session provided"}
    assert response.status_code == 403
