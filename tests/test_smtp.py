from smtplib import SMTP


def health():
    assert 1 == 1  # TODO


def test_authentication_required():
    with SMTP('localhost', 2525) as smtp:
        try:
            res = smtp.noop()
        except:  # smtplib.SMTPServerDisconnected
            res = -1
    assert res[0] == 530
    assert res[1] == b'Authentication required'
