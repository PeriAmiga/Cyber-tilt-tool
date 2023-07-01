from smtplib import SMTP
import checker


def health():
    assert checker.check('localhost', 2525) == True


def test_authentication_required():
    with SMTP('localhost', 2525) as smtp:
        try:
            res = smtp.noop()
        except:  # smtplib.SMTPServerDisconnected
            res = -1
    assert res[0] == 530
    assert res[1] == b'Authentication required'
