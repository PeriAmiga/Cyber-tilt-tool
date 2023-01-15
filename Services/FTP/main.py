from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.servers import FTPServer
from Handler import ToolHandler

# The port the FTP server will listen on.
# This must be greater than 1023 unless you run this script as root.
FTP_PORT = 21

# The name of the FTP user that can log in.
FTP_USER = "root"

# The FTP user's password.
FTP_PASSWORD = "toor"

# The directory the FTP user will have full read/write access to.
FTP_DIRECTORY = "FTPServer"


def main():
    authorizer = DummyAuthorizer()

    # Define a new user having full r/w permissions.
    authorizer.add_user(FTP_USER, FTP_PASSWORD, FTP_DIRECTORY, perm='elradfmw')

    handler = ToolHandler
    handler.authorizer = authorizer

    # Define a customized banner (string returned when client connects)
    handler.banner = "Client Connected Successfully."

    address = ('', FTP_PORT)
    with FTPServer(address, handler) as server:
        server.max_cons = 256
        server.max_cons_per_ip = 5
        server.serve_forever(timeout=1)

if __name__ == '__main__':
    main()