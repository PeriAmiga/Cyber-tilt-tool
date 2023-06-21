from ftplib import FTP



def test_health():
    ftp = FTP()
    x = ftp.connect("localhost", 2121)
    assert x == '220 Client Connected Successfully.'

