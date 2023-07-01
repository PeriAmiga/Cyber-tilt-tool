from pyftpdlib.handlers import FTPHandler
import requests
import os


class ToolHandler(FTPHandler):
    session = ""

    def on_connect(self):
        #log(session=self.session, msg="on_connect")
        # log(session=self.session,
        #    msg=f"IP:{self.remote_ip} Port:{self.remote_port}")
        print('on_connect')
        pass

    def on_disconnect(self):
        log(session=self.session, msg="on_disconnect")
        pass

    def on_login(self, username):
        self.session = init(self.remote_ip, username)
        log(session=self.session, msg="on_login")
        pass

    def on_logout(self, username):
        log(session=self.session, msg=f"on_logout '{username}'")
        pass

    def on_file_sent(self, file):
        log(session=self.session, msg="on_file_sent")
        pass

    def on_file_received(self, file):
        log(session=self.session, msg="on_file_received")
        pass

    def on_incomplete_file_sent(self, file):
        log(session=self.session, msg="on_incomplete_file_sent")
        pass

    def on_incomplete_file_received(self, file):
        log(session=self.session, msg="on_incomplete_file_received")
        pass


###### LOG ########
def log(session, msg):
    requests.post('https://backend/api/log',
                  json={
                      "sessionID": session,
                      "description": msg
                  }, verify=False)


def init(attackerIP, username) -> str:
    obj = {
        "serviceID": os.environ.get('SERVICE_ID'),
        "companyID": os.environ.get('COMPANY_ID'),
        "attackerIP": attackerIP,
        "trapID": get_tarp_id(username)
    }
    print(obj)
    data = requests.post('https://backend/api/log/init',
                         json=obj, verify=False
                         )
    return data.text  # return id


def get_tarp_id(username) -> int:
    # Options:
    # 4 - Fake User
    # 5 - Hidden Admin
    if username == "Administrator" or username == "root":
        return 5
    if username == "user":
        return 4

    return 4
