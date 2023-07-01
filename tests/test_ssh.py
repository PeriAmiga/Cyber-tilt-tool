import checker


def test_health():
    assert checker.check('localhost', 2222) == True
