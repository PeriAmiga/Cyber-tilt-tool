import requests


def test_health():
    response = requests.get('http://localhost:8080/')
    assert response.status_code == 200


def test_api_usersdetails_without_auth():
    response = requests.get('http://localhost:8080/UsersDetails')
    assert response.status_code == 403
