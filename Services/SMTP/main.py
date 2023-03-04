import asyncio
from aiosmtpd.controller import Controller

class CustomSMTPServer:
    async def handle_RCPT(self, server, session, envelope, address, rcpt_options):
        envelope.rcpt_tos.append(address)
        return '250 OK'

    async def handle_DATA(self, server, session, envelope):
        print('Received message from %s' % envelope.mail_from)
        print('Recipients:', envelope.rcpt_tos)
        print('Message data:\n%s' % envelope.content.decode('utf8', errors='replace'))
        return '250 Message accepted for delivery'

async def main(loop):
    handler = CustomSMTPServer()
    controller = Controller(handler, loop=loop, hostname='10.0.0.9', port=25)
    controller.start()

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.create_task(main(loop))
    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        loop.stop()