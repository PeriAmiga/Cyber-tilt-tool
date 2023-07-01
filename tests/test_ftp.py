from ftplib import FTP


def test_health_intel():
    ftp = FTP()
    x = ftp.connect("localhost", 2121)
    assert x == '220 Client Connected Successfully.'


def test_health_apple():
    ftp = FTP()
    x = ftp.connect("localhost", 2122)
    assert x == '220 Client Connected Successfully.'
