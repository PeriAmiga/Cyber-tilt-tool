from smtplib import SMTP


# TODO
def test_health():
    with SMTP('localhost', 2525) as smtp:
        try:
            res = smtp.noop()[0]
        except:  # smtplib.SMTPServerDisconnected
            res = -1
    assert res == 205
