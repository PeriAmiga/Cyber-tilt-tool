from pyftpdlib.handlers import FTPHandler
import requests
import os


class ToolHandler(FTPHandler):
    session = ""

    def on_connect(self):
        print("on_connect")
        print(f"IP:{self.remote_ip} Port:{self.remote_port}")

    def on_disconnect(self):
        print("on_disconnect")
        pass

    def on_login(self, username):
        self.session = init(self.remote_ip, username)
        pass

    def on_logout(self, username):
        print("on_logout")
        print("username:", username)
        print(f"{self.remote_ip} {self.remote_port}")
        pass

    def on_file_sent(self, file):
        print("on_file_sent")
        pass

    def on_file_received(self, file):
        print("on_file_received")
        pass

    def on_incomplete_file_sent(self, file):
        print("on_incomplete_file_sent")
        pass

    def on_incomplete_file_received(self, file):
        print("on_incomplete_file_received")
        pass


def log(session, msg):
    res = requests.post('http://backend/api/log',
                        {"sessionID": session,
                         "description": msg}
                        )
    print(res.text)
    print(res.status_code)


def init(attackerIP, username) -> str:
    data = requests.post('http://backend/api/log/init',
                         {
                             "serviceID": os.environ.get('SERVICE_ID'),
                             "companyID": os.environ.get('COMPANY_ID'),
                             "attackerIP": attackerIP,
                             "trapID": get_tarp_id(username)
                         }
                         )
    print(data.text)
    print(data.status_code)
    return data.text

def get_tarp_id(username):
    # Options:
    # 4 - Fake User
    # 5 - Hidden Admin
    if username == "Administrator" or username == "root"
        return 5
    if username == "user
        return 4

    return 4