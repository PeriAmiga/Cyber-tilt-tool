import asyncio
from aiosmtpd.controller import Controller
from aiosmtpd.handlers import Debugging

class CustomController(Controller):
    def factory(self):
        return Debugging(self)

async def start_server(loop):
    controller = CustomController(
        hostname='10.0.0.9',
        port=1035,
        loop=loop
    )
    await controller.start()

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.create_task(start_server(loop))
    loop.run_forever()
