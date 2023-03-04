from rdpy.protocol.rdp import RDP
from rdpy.server import RDPListener

class MyRDP(RDP):
    def on_authenticate(self, username, password, domain):
        return True

    def on_desktop_size(self, width, height, color_depth):
        pass

    def on_connection_lost(self):
        pass

    def on_receive(self, data):
        pass

    def on_send(self, data):
        pass

listener = RDPListener("localhost", 3389)
listener.start(MyRDP)