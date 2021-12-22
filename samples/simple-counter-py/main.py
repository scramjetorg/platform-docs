import asyncio
from scramjet.streams import Stream

class Count():
    def __init__(self) -> None:
        self.count = 0
    async def __aiter__(self):
        while True:
            await asyncio.sleep(1)
            self.count += 1
            yield self.count

def run(args):
    return Stream.read_from(Count()).map(str)
